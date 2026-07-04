import { interpretBikeIssue, concludeDiagnosis } from '../services/geminiServices.js';
import { checkSafetyGate } from '../utils/safetyGate.js';
import { findBestMatches } from '../services/vectorSearch.js';
import { DiagnosticSession } from '../models/DiagnosticSession.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

// POST /api/v1/diagnose
export const diagnoseIssue = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    throw new ApiError(400, 'Issue message is required');
  }

  // Step 1: Safety gate
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

  // Step 2: Gemini interprets
  const interpretedIssue = await interpretBikeIssue(message);

  // Step 3: Vector search
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

  // Step 4: Create a session in MongoDB
  const session = await DiagnosticSession.create({
    originalMessage: message,
    vehicleType: interpretedIssue.vehicle_type,
    matchedSymptom: matches[0].symptom,
    conversation: [
      { role: 'user', content: message },
    ],
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        type: 'match_found',
        sessionId: session._id,
        interpretedIssue,
        matches,
      },
      'Matches found'
    )
  );
});

// POST /api/v1/diagnose/conclude
export const concludeIssue = asyncHandler(async (req, res) => {
  const { originalIssue, causes, qaHistory, sessionId } = req.body;

  if (!originalIssue || !causes || !qaHistory) {
    throw new ApiError(400, 'originalIssue, causes and qaHistory are required');
  }

  // Get Gemini's conclusion
  const conclusion = await concludeDiagnosis(originalIssue, causes, qaHistory);

  // Update session in MongoDB if sessionId exists
  if (sessionId) {
    const conversationUpdates = [
      // Add all Q&A pairs to the conversation log
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