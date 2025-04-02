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

# Import Upstash REST API database handling functions
from db import init_db, close_db, get_last_query_time, save_query_time

app = FastAPI()

# Enable CORS to allow frontend to access backend API
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load variables from .env
load_dotenv() 

# Load OpenAI API key
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

# Initialize HTTP client session
init_db()

# Close session when application shuts down
@app.on_event("shutdown")
async def shutdown_event():
    await close_db()

# Load resume PDF and create vector database
loader = PyPDFLoader(RESUME_FILE)
docs = loader.load()
vectorstore = FAISS.from_documents(docs, OpenAIEmbeddings())
retriever = vectorstore.as_retriever()

# Initialize GPT model and enable `ConversationalRetrievalChain`
llm = ChatOpenAI(temperature=TEMPERATURE, model_name=MODEL_NAME)

# Initialize the conversational retrieval chain
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    return_source_documents=False,
)

# Define the request body structure for the chatbot API
class Query(BaseModel):
    query: str  # User's question
    chat_history: list = []  # Support for conversation history for better context

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
                "answer": "LIMIT_EXCEEDED",  # Access limit exceeded
                "time_remaining": f"{hours}h {minutes}m {seconds}s"
            }

    # Update the timestamp of the last query
    await save_query_time()

    # Combine system prompt with user's question
    full_query = f"{SYSTEM_PROMPT}\n\n{query.query}"

    # Pass conversation history to help AI remember previous interactions
    response = qa_chain.invoke({
        "question": full_query,
        "chat_history": query.chat_history,
    })

    return {"answer": response["answer"]}

@app.get("/")
def root():
    """Simple keep-alive route for uptime checks"""
    return {"message": "Backend is alive"}