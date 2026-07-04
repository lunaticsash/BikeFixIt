import { KnowledgeEntry } from '../models/KnowledgeEntry.js';
import { generateEmbedding } from './embeddingService.js';

const SIMILARITY_THRESHOLD = 0.35;

const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
};

const findBestMatches = async (interpretedIssue, topK = 3) => {
  const searchText = [
    interpretedIssue.cleaned_user_issue,
    interpretedIssue.symptoms.join(' '),
    interpretedIssue.likely_keywords.join(' '),
  ].join(' ');

  const queryEmbedding = await generateEmbedding(searchText);

  // Improvement 1: filter by vehicle_type before scoring
  const vehicleType = interpretedIssue.vehicle_type;
  const entries = await KnowledgeEntry.find({
    vehicle_type: { $in: [vehicleType, 'both'] },
  });

  const scored = entries.map((entry) => ({
    entry,
    score: cosineSimilarity(queryEmbedding, entry.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  // Improvement 3: log real scores so you can pick a threshold based on actual data
  console.log('📊 Similarity scores:');
  scored.forEach(({ entry, score }) => {
    console.log(`  ${score.toFixed(4)} — ${entry.symptom}`);
  });

  // Improvement 2: return top 3 instead of just the best
  // No threshold yet — look at the logged scores first across several
  // test inputs, then set a threshold in the next session
    // threshold filter + topK slice together
  const topMatches = scored
    .filter(({ score }) => score >= SIMILARITY_THRESHOLD)
    .slice(0, topK);

  if (topMatches.length === 0) return [];

  return topMatches.map(({ entry, score }) => ({
    score: parseFloat(score.toFixed(4)),
    symptom: entry.symptom,
    severity: entry.severity,
    disambiguating_questions: entry.disambiguating_questions,
    causes: entry.causes,
    est_cost_range: entry.est_cost_range,
    vehicle_type: entry.vehicle_type,
  }));
};

export { findBestMatches };