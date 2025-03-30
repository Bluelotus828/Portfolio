# Guanlin Yu — Portfolio Site with AI Chatbot

A personal portfolio site built from scratch to showcase my work, experience, and an interactive AI-powered resume chatbot. Designed, styled, and animated with care. Yes, even this site is part of my portfolio. 

---

## Tech Stack

### Frontend
- **React.js** with `styled-components`
- **Framer Motion** for animations
- **React Icons**
- **Vite** for fast bundling

### Backend
- **FastAPI** with `LangChain`
- **OpenAI GPT-4o**
- **FAISS** Vector DB
- **PyPDFLoader** for PDF parsing

---

## Features

- Interactive chatbot powered by OpenAI + LangChain
- PDF résumé embedded as context for Q&A
- Typing animation, auto-scroll, and rate-limiting
- Clean, responsive UI with React
- Hosted with Vercel (frontend) and Render (backend)

---

## Project Structure

```plaintext
├── chatbot/             # FastAPI backend with LangChain & OpenAI
│   ├── main.py
│   ├── config.py
│   ├── texts.py
│   ├── .env             # OpenAI key (not uploaded)
│   └── resume_chatbot.pdf
│
└── portfolio/           # React frontend with chatbot UI
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── constants/   # texts.js & config.js
    ├── public/
    └── ...
```

## Setup Instructions

### Backend (FastAPI)
```bash
cd chatbot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend (React)
cd portfolio
npm install
npm run dev
