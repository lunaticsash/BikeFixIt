# BikeFixIt 🔧
### AI-Powered Bike & Scooter Diagnostic Tool for India

<div align="center">

![BikeFixIt Banner](https://img.shields.io/badge/BikeFixIt-AI%20Diagnostic-E8192C?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIyIDEybC00LTQtMS41IDEuNUwyMCAxM2wtOCA4LTgtOCA0LjUtNC41TDYgN2wtNC00IDEuNS0xLjVMNyA1LjVsMS41LTEuNUw2IDJsLTQgNHY0bDEwIDEwIDEwLTEwdi00eiIvPjwvc3ZnPg==)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-E8192C?style=for-the-badge)](https://bike-fix-it.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/yourusername/bike-fixit)

**Describe your bike problem in Hindi, Hinglish, or English — get diagnosed in under 30 seconds.**

[Live Demo](https://bike-fix-it.vercel.app)

</div>

---

## The Problem

India has 200M+ petrol bike and scooter owners. Most of them have been overcharged by a mechanic at some point — because they had no way to know what was actually wrong before walking in.

**BikeFixIt fixes that.** Describe your problem in plain language — your mechanic's language, your language — and get a diagnosis with an honest cost estimate before you ever visit a shop.

---

## Demo

> Type: *"meri activa start nahi ho rahi, click click sound aa rahi hai"*

```
BikeFixIt asks: "Is the horn sounding very weak when you press it?"
You answer:      Yes

BikeFixIt asks: "Does the bike start with kick-start?"  
You answer:      Yes

BikeFixIt asks: "Are the battery wires loose or covered in white powder?"
You answer:      No

BikeFixIt:      → Most likely cause: Weak battery
                → Recharge first. If issue returns, replace.
                → Est. cost: ₹300–1800
                → Don't pay more than this. If your mechanic quotes higher, ask why.
```

---

## Features

- 🗣️ **Multilingual** — understands Hindi, Hinglish, and English input naturally
- 🔍 **Smart follow-up questions** — one Yes/No question at a time, like a real mechanic
- 💰 **Honest cost estimates** — so no one can overcharge you
- ⚠️ **Safety gate** — instantly flags brake failures, fuel leaks, smoke — skip AI, go to mechanic now
- 🧠 **Hybrid AI architecture** — Gemini interprets language, curated KB drives the diagnosis (no hallucinations)
- ⚡ **Redis caching** — repeat queries served instantly, Gemini API skipped
- 🛡️ **Rate limiting** — IP-based abuse prevention via Redis
- 💾 **Session persistence** — every diagnostic conversation saved to MongoDB
- 🌙 **Dark / Light mode** — persistent via localStorage
- 📱 **Mobile responsive**

---

## Architecture

This is the part that makes BikeFixIt different from a generic ChatGPT wrapper:

```
User message (Hindi / Hinglish / English)
              ↓
    ┌─────────────────────┐
    │   Redis Cache Check  │ ← if hit, return instantly (skip everything below)
    └─────────────────────┘
              ↓ cache miss
    ┌─────────────────────┐
    │    Safety Gate       │ ← hardcoded rules, no AI
    │ (brake/fuel/smoke)   │ → "See a mechanic NOW"
    └─────────────────────┘
              ↓ safe
    ┌─────────────────────┐
    │   Gemini 2.5 Flash   │ ← interprets messy language → structured JSON
    │  (NLP layer only)    │   { vehicle_type, symptoms, keywords }
    └─────────────────────┘
              ↓
    ┌─────────────────────┐
    │   Vector Search      │ ← local HuggingFace embeddings + cosine similarity
    │  (Knowledge Base)    │   finds top 3 matching KB entries (threshold: 0.35)
    └─────────────────────┘
              ↓
    ┌─────────────────────┐
    │  Follow-up Q&A Flow  │ ← one Yes/No question at a time
    │  (Frontend state)    │   collects 2-3 answers
    └─────────────────────┘
              ↓
    ┌─────────────────────┐
    │   Gemini 2.5 Flash   │ ← concludes single most likely cause
    │  (Conclusion only)   │   from KB causes + Q&A answers
    └─────────────────────┘
              ↓
    Fix + Cost Range + Next Step
    (from Knowledge Base — never freely generated)
```

**Why this architecture?**

A pure "ask the LLM to diagnose" approach hallucinates repair steps. A wrong fix on a petrol vehicle is dangerous. So Gemini is used only for language understanding and final selection — all actual repair knowledge comes from a hand-curated, verified knowledge base. AI interprets, humans decide what's true.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React + Vite + Tailwind CSS v4 | Fast, modern, component-based |
| Routing | React Router DOM | Client-side navigation |
| Backend | Node.js + Express | REST API |
| Database | MongoDB Atlas + Mongoose | Persistent session storage |
| AI — NLP | Google Gemini 2.5 Flash | Best free-tier multilingual understanding |
| AI — Embeddings | @huggingface/transformers | Runs locally, completely free, no API key |
| Vector Search | Cosine similarity (plain JS) | No vector DB needed at this scale |
| Caching | Upstash Redis | Repeat query caching + rate limiting |
| Deployment | Vercel (frontend) + Render (backend) | Free tier, auto-deploy on push |

---

## Knowledge Base Design

The KB is the heart of BikeFixIt — 20+ hand-curated entries covering India's most common petrol bike issues:

```json
{
  "symptom": "Self-start makes clicking sound",
  "keywords": ["clicking sound", "self start", "battery", "relay"],
  "vehicle_type": "both",
  "disambiguating_questions": [
    "Is the horn sounding very weak when you press it?",
    "Does the bike start easily with kick-start?",
    "Are the battery wires loose or covered in white powder?"
  ],
  "causes": [
    {
      "name": "Weak battery",
      "fix": "Recharge the battery first. If issue returns, replace it.",
      "est_cost_range": "₹300-1800"
    }
  ],
  "severity": "DIY-safe",
  "embedding_text": "Activa self start not working click click sound clicking noise..."
}
```

Vehicles covered: Activa • Splendor • Pulsar • Apache • Jupiter • HF Deluxe • CT100 • Bullet • FZ • and more.

---

## Project Structure

```
bike-fixit/
├── client/                        # React Frontend
│   └── src/
│       ├── components/
│       │   ├── landing/           # Navbar, Hero, HowItWorks, VehicleStrip, Footer
│       │   └── chat/              # ChatWindow, MessageBubble, QuestionBubble,
│       │                          # DiagnosisCard, ConclusionCard, InputBar
│       ├── context/
│       │   └── ThemeContext.jsx   # Dark/light mode, persisted to localStorage
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   └── ChatPage.jsx       # Gemini-style centered input → chat flow
│       └── api/client.js          # Axios instance → backend only
│
└── server/                        # Node/Express Backend
    ├── src/
    │   ├── controllers/
    │   │   └── diagnoseController.js
    │   ├── services/
    │   │   ├── geminiService.js       # Gemini API calls (interpret + conclude)
    │   │   ├── embeddingService.js    # HuggingFace local embeddings
    │   │   ├── vectorSearch.js        # Cosine similarity search
    │   │   └── cacheService.js        # Redis get/set via Upstash
    │   ├── models/
    │   │   ├── KnowledgeEntry.js      # KB schema with embedded Cause subdocs
    │   │   └── DiagnosticSession.js   # Full conversation + conclusion storage
    │   ├── utils/
    │   │   ├── safetyGate.js          # Hardcoded keyword rules
    │   │   ├── rateLimiter.js         # IP-based Redis rate limiting
    │   │   ├── ApiError.js
    │   │   ├── ApiResponse.js
    │   │   └── asyncHandler.js
    │   ├── scripts/
    │   │   └── seedKnowledgeBase.js   # One-time: embed + load KB into MongoDB
    │   └── data/
    │       └── knowledgeBase.json     # Hand-curated bike issues
    └── index.js
```

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free)
- Google Gemini API key (free — console.anthropic.com)
- Upstash account (free — upstash.com)

### Backend
```bash
cd server
npm install

# Create server/.env
MONGO_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_gemini_api_key
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
PORT=5000

# Seed the knowledge base (run once)
node scripts/seedKnowledgeBase.js

# Start dev server
npm run dev
```

### Frontend
```bash
cd client
npm install

# Create client/.env
VITE_API_URL=http://localhost:5000/api/v1

npm run dev
```

Open `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/diagnose` | Main diagnostic flow — interprets issue, returns KB matches |
| `POST` | `/api/v1/diagnose/conclude` | Final conclusion from Gemini based on Q&A history |

### POST `/api/v1/diagnose`
```json
// Request
{ "message": "meri activa start nahi ho rahi" }

// Response
{
  "type": "match_found",
  "sessionId": "...",
  "interpretedIssue": {
    "vehicle_type": "scooter",
    "symptoms": ["not starting"],
    "likely_keywords": ["Activa", "engine not starting"]
  },
  "matches": [
    {
      "score": 0.71,
      "symptom": "Self-start makes clicking sound",
      "severity": "DIY-safe",
      "disambiguating_questions": [...],
      "causes": [...]
    }
  ]
}
```

---

## What I Learned Building This

- **Hybrid AI architecture** — when to use LLMs vs curated data, and why hallucination risk matters for safety-critical domains
- **Local embeddings** — running HuggingFace transformer models on-device (free, no API key) for semantic similarity search
- **Redis patterns** — TTL-based caching for expensive API calls, and `INCR`+`EXPIRE` for rate limiting
- **Prompt engineering** — constraining Gemini to return structured JSON, and how system prompt design affects output reliability
- **Full-stack deployment** — environment variables, CORS configuration, Vercel + Render setup

---

## Roadmap

- [ ] User authentication (JWT) + saved vehicle profiles
- [ ] Diagnostic history page per user
- [ ] Hindi UI language option
- [ ] More KB entries (50+ issues)
- [ ] Photo-based diagnosis (vision model)
- [ ] Mechanic finder integration

---

## Contributing

Pull requests welcome. For major changes please open an issue first.

---

## License

MIT

---

<div align="center">
Built for India's 200M+ petrol bike owners. Free, always. 🇮🇳

**[Try it live →](https://bike-fix-it.vercel.app)**
</div>