import mongoose from 'mongoose';
import { interpretBikeIssue, concludeDiagnosis } from '../services/geminiServices.js';
import { checkSafetyGate } from '../utils/safetyGate.js';
import { findBestMatches } from '../services/vectorSearch.js';
import { getCached, setCache } from '../services/cacheService.js';
import { DiagnosticSession } from '../models/DiagnosticSession.js';
import { KnowledgeEntry } from '../models/KnowledgeEntry.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const MAX_MESSAGE_LENGTH = 300;
const MAX_ANSWERS = 3;
const MAX_ANSWER_LENGTH = 100;

// POST /api/v1/diagnose
export const diagnoseIssue = asyncHandler(async (req, res) => {
  const raw = req.body?.message;
  const message = typeof raw === 'string' ? raw.trim() : '';

  if (!message) throw new ApiError(400, 'Issue message is required');
  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new ApiError(400, `Message must be ${MAX_MESSAGE_LENGTH} characters or less`);
  }

  // 1. Safety gate pehle (cheap, cache ki zaroorat nahi)
  const safetyResult = checkSafetyGate(message);
  if (safetyResult.isUnsafe) {
    return res.status(200).json(
      new ApiResponse(200, { type: 'safety_warning', safety: safetyResult }, 'Safety-critical issue detected')
    );
  }

  // 2. Cache me sirf interpretedIssue + matches, kabhi sessionId nahi
  let interpretedIssue;
  let matches;
  const cached = await getCached(message);

  if (cached) {
    console.log('✅ Cache hit');
    ({ interpretedIssue, matches } = cached);
  } else {
    interpretedIssue = await interpretBikeIssue(message);
    matches = await findBestMatches(interpretedIssue);
    if (matches.length > 0) setCache(message, { interpretedIssue, matches }); // non-blocking
  }

  if (matches.length === 0) {
    return res.status(200).json(
      new ApiResponse(
        200,
        { type: 'no_match', message: "Couldn't find this issue. Try describing it differently.", interpretedIssue },
        'No match found'
      )
    );
  }

  // 3. Session HAR request pe banta hai, cache hit pe bhi
  const session = await DiagnosticSession.create({
    originalMessage: message,
    vehicleType: interpretedIssue.vehicle_type,
    matchedSymptom: matches[0].symptom,
    conversation: [{ role: 'user', content: message }],
  });

  return res.status(200).json(
    new ApiResponse(200, { type: 'match_found', sessionId: session._id, interpretedIssue, matches }, 'Matches found')
  );
});

// POST /api/v1/diagnose/conclude   body: { sessionId, answers: ['Yes', 'No', ...] }
export const concludeIssue = asyncHandler(async (req, res) => {
  const { sessionId, answers } = req.body ?? {};

  if (!mongoose.isValidObjectId(sessionId)) {
    throw new ApiError(400, 'A valid sessionId is required');
  }
  if (
    !Array.isArray(answers) ||
    answers.length === 0 ||
    answers.length > MAX_ANSWERS ||
    answers.some((a) => typeof a !== 'string' || !a.trim() || a.length > MAX_ANSWER_LENGTH)
  ) {
    throw new ApiError(400, `answers must be 1 to ${MAX_ANSWERS} short strings`);
  }

  const session = await DiagnosticSession.findById(sessionId);
  if (!session) throw new ApiError(404, 'Session not found');

  // Already concluded: Gemini dobara call nahi hoga
  if (session.resolved && session.conclusion?.concluded_cause) {
    return res.status(200).json(
      new ApiResponse(200, { type: 'conclusion', conclusion: session.toObject().conclusion }, 'Diagnosis already concluded')
    );
  }

  // Trusted data DB se, client se nahi
  const entry = await KnowledgeEntry.findOne({ symptom: session.matchedSymptom });
  if (!entry) throw new ApiError(404, 'Knowledge entry not found');

  const causes = entry.causes.map(({ name, fix, est_cost_range }) => ({ name, fix, est_cost_range }));
  const qaHistory = answers.map((answer, i) => ({
    question: entry.disambiguating_questions[i] ?? 'Additional detail',
    answer: answer.trim(),
  }));

  const conclusion = await concludeDiagnosis(session.originalMessage, causes, qaHistory);

  // Gemini ne list ke bahar ka cause diya to reject
  const matched = causes.find((c) => c.name === conclusion.concluded_cause);
  if (!matched) {
    throw new ApiError(502, 'Could not reach a reliable conclusion. Please try again.');
  }
  conclusion.est_cost = matched.est_cost_range; // cost KB se, LLM se nahi

  await DiagnosticSession.findByIdAndUpdate(sessionId, {
    $push: {
      conversation: {
        $each: [
          ...qaHistory.flatMap((qa) => [
            { role: 'bot', content: qa.question },
            { role: 'user', content: qa.answer },
          ]),
          { role: 'bot', content: `Diagnosis: ${conclusion.concluded_cause} - ${conclusion.next_step}` },
        ],
      },
    },
    conclusion,
    resolved: true,
  });

  return res.status(200).json(new ApiResponse(200, { type: 'conclusion', conclusion }, 'Diagnosis concluded'));
});