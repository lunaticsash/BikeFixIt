import 'dotenv/config';
import { readFile } from 'fs/promises';
import connectDB from '../db/index.js';
import { KnowledgeEntry } from '../models/KnowledgeEntry.js';
import { generateEmbedding } from '../services/embeddingService.js';

const seed = async () => {
  await connectDB();

  const raw = await readFile('./data/knowledgeBase.json', 'utf-8');
  const entries = JSON.parse(raw);

  // Clear existing entries so re-running doesn't duplicate
  await KnowledgeEntry.deleteMany({});
  console.log('🗑️  Cleared existing knowledge base');

  for (const entry of entries) {
    const embedding = await generateEmbedding(entry.embedding_text);
    await KnowledgeEntry.create({ ...entry, embedding });
    console.log(`✅ Seeded: ${entry.symptom}`);
  }

  console.log('🌱 Knowledge base seeded successfully');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});