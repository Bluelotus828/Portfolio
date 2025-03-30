from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import ConversationalRetrievalChain
from langchain.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv
import os
import time

from config import RESUME_FILE, MODEL_NAME, TEMPERATURE, LIMIT_SECONDS, ALLOWED_ORIGINS
from texts import SYSTEM_PROMPT

app = FastAPI()

# Enable CORS to allow the frontend to access the backend API
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # Change this to your frontend URL if deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load variables from .env
load_dotenv() 

# Load OpenAI API Key
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

# Load the resume PDF and create a vector database
loader = PyPDFLoader(RESUME_FILE)  # Load the resume file
docs = loader.load()
vectorstore = FAISS.from_documents(docs, OpenAIEmbeddings())  # Convert documents into vector embeddings
retriever = vectorstore.as_retriever()  # Create a retriever for search

# Initialize GPT-4o-mini and enable `ConversationalRetrievalChain`
llm = ChatOpenAI(temperature=TEMPERATURE, model_name=MODEL_NAME)

# Initializes a Conversational Retrieval Chain
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    return_source_documents=False,
)

# Store the timestamp of the last query
last_query_timestamp = 0  # Keeps track of the last query time

class Query(BaseModel):
    """Defines the structure of the request body for the chatbot API"""
    query: str  # User's question
    chat_history: list = []  # Supports conversation history for better context retention

@app.post("/chat")
def ask(query: Query):
    """Handles chatbot queries and enforces a 24-hour rate limit"""
    global last_query_timestamp

    current_time = time.time()
    time_remaining = LIMIT_SECONDS - (current_time - last_query_timestamp)

    if time_remaining > 0:
        # If accessed again within 24 hours, return an error message
        hours = int(time_remaining // 3600)
        minutes = int((time_remaining % 3600) // 60)
        seconds = int(time_remaining % 60)
        return {
            "answer": "LIMIT_EXCEEDED",
            "time_remaining": f"{hours}h {minutes}m {seconds}s"
        }

    # Update the timestamp of the last query
    last_query_timestamp = current_time

    # Combine system prompt with user's question
    full_query = f"{SYSTEM_PROMPT}\n\n{query.query}"

    # Pass conversation history to help AI remember previous interactions
    response = qa_chain.invoke({
        "question": full_query,
        "chat_history": query.chat_history,  # Allows for more coherent multi-turn conversations
    })

    return {"answer": response["answer"]}

@app.get("/")
def root():
    """Simple keep-alive route for uptime checks"""
    return {"message": "Backend is alive"}