from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import ConversationalRetrievalChain
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv
from datetime import datetime
import os

from config import RESUME_FILE, MODEL_NAME, TEMPERATURE, LIMIT_SECONDS, ALLOWED_ORIGINS
from texts import SYSTEM_PROMPT

# Import SQLite-based time state handlers
from db import init_db, get_last_query_time, save_query_time

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

# Defines the structure of the request body for the chatbot API
class Query(BaseModel):
    query: str  # User's question
    chat_history: list = []  # Supports conversation history for better context retention

@app.post("/chat")
async def ask(query: Query):
    last_time = await get_last_query_time()  # Get last query timestamp
    now = datetime.utcnow()

    if last_time:
        elapsed = (now - last_time).total_seconds()
        if elapsed < LIMIT_SECONDS:
            remaining = LIMIT_SECONDS - elapsed
            hours = int(remaining // 3600)
            minutes = int((remaining % 3600) // 60)
            seconds = int(remaining % 60)
            return {
                "answer": "LIMIT_EXCEEDED",  # 超过访问限制 | Access limit exceeded
                "time_remaining": f"{hours}h {minutes}m {seconds}s"
            }

    # Update the timestamp of the last query
    await save_query_time()  # Save current query time

    # Combine system prompt with user's question
    full_query = f"{SYSTEM_PROMPT}\n\n{query.query}"

    # Pass conversation history to help AI remember previous interactions
    response = qa_chain.invoke({
        "question": full_query,
        "chat_history": query.chat_history,  # Pass chat history
    })

    return {"answer": response["answer"]}

@app.get("/")
def root():
    """Simple keep-alive route for uptime checks"""
    return {"message": "Backend is alive"}
