import { interpretBikeIssue, concludeDiagnosis } from '../services/geminiServices.js';
import { checkSafetyGate } from '../utils/safetyGate.js';
import { findBestMatches } from '../services/vectorSearch.js';
import { DiagnosticSession } from '../models/DiagnosticSession.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { getCached, setCache } from '../services/cacheService.js';

// POST /api/v1/diagnose
export const diagnoseIssue = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    throw new ApiError(400, 'Issue message is required');
  }

  // Step 1: Check cache first — skip Gemini + vector search if hit
  const cached = await getCached(message);
  if (cached) {
    console.log('✅ Cache hit for:', message);
    return res.status(200).json(
      new ApiResponse(200, cached, 'Matches found (cached)')
    );
  }

  // Step 2: Safety gate
  const safetyResult = checkSafetyGate(message);
  if (safetyResult.isUnsafe) {
    return res.status(200).json(
      new ApiResponse(
        200,
        { type: 'safety_warning', safety: safetyResult },
        'Safety-critical issue detected'
      )
    );
  }

  // Step 3: Gemini interprets
  const interpretedIssue = await interpretBikeIssue(message);

  // Step 4: Vector search
  const matches = await findBestMatches(interpretedIssue);

  if (matches.length === 0) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          type: 'no_match',
          message: "Couldn't find this issue. Try describing it differently.",
          interpretedIssue,
        },
        'No match found'
      )
    );
  }

  // Step 5: Create session in MongoDB
  const session = await DiagnosticSession.create({
    originalMessage: message,
    vehicleType: interpretedIssue.vehicle_type,
    matchedSymptom: matches[0].symptom,
    conversation: [
      { role: 'user', content: message },
    ],
  });

  const responseData = {
    type: 'match_found',
    sessionId: session._id,
    interpretedIssue,
    matches,
  };

  // Step 6: Save to cache for next time (don't await — non-blocking)
  setCache(message, responseData);

  return res.status(200).json(
    new ApiResponse(200, responseData, 'Matches found')
  );
});

// POST /api/v1/diagnose/conclude
export const concludeIssue = asyncHandler(async (req, res) => {
  const { originalIssue, causes, qaHistory, sessionId } = req.body;

  if (!originalIssue || !causes || !qaHistory) {
    throw new ApiError(400, 'originalIssue, causes and qaHistory are required');
  }

  const conclusion = await concludeDiagnosis(originalIssue, causes, qaHistory);

  if (sessionId) {
    const conversationUpdates = [
      ...qaHistory.flatMap((qa) => [
        { role: 'bot', content: qa.question },
        { role: 'user', content: qa.answer },
      ]),
      {
        role: 'bot',
        content: `Diagnosis: ${conclusion.concluded_cause} — ${conclusion.next_step}`,
      },
    ];

    await DiagnosticSession.findByIdAndUpdate(sessionId, {
      $push: { conversation: { $each: conversationUpdates } },
      conclusion,
      resolved: true,
    });
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { type: 'conclusion', conclusion },
      'Diagnosis concluded'
    )
  );
});