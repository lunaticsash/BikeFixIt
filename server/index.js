import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import diagnoseRouter from "./routes/diagnose.js";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use("/api/v1/diagnose", diagnoseRouter);

// Temporary route — just to prove the server is alive. Deleted once
// routes/diagnose.js exists in Phase D.

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Global error handler — must stay the LAST app.use(). Any ApiError
// thrown anywhere in the app lands here automatically.
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    statusCode,
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
  });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Failed to start server:', err));