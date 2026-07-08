# BikeFixIt 🔧
### AI-powered bike & scooter diagnostic tool for India

Describe your bike problem in Hindi, Hinglish, or English — BikeFixIt asks the right questions and tells you the exact fix + fair cost estimate so no mechanic can overcharge you.

**[Live Demo →](https://bike-fix-it.vercel.app/)**

---

## Features
- 🗣️ Understands Hindi, Hinglish & English input
- 🔍 AI narrows down cause via Yes/No follow-up questions  
- 💰 Fair cost estimate for every diagnosis
- ⚠️ Safety gate for critical issues (brakes, fuel leaks, smoke)
- 🌙 Dark/Light mode
- 📱 Mobile responsive

## Tech Stack
**Frontend:** React, Vite, Tailwind CSS v4, React Router  
**Backend:** Node.js, Express, MongoDB Atlas, Mongoose  
**AI:** Google Gemini 2.5 Flash (language interpretation + conclusion)  
**Embeddings:** @huggingface/transformers (local, free)  
**Vector Search:** Cosine similarity in plain JS  

## Architecture
    User message (Hindi/English/Hinglish)
    ↓
    Safety Gate (hardcoded rules)
    ↓
    Gemini — interprets language → structured JSON
    ↓
    Vector Search — finds best KB match via embeddings
    ↓
    One-question-at-a-time follow-up (Yes/No/Not Sure)
    ↓
    Gemini — concludes single most likely cause
    ↓
    Fix + fair cost estimate

## Local Setup
```bash
# Backend
cd server
npm install
# Add .env with MONGO_URI and GEMINI_API_KEY
npm run dev

# Frontend
cd client
npm install
npm run dev
```