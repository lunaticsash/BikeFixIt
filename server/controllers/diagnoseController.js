import { interpretBikeIssue } from "../services/geminiServices.js";
import { checkSafetyGate } from "../utils/safetyGate.js";
import { findBestMatches } from "../services/vectorSearch.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { concludeDiagnosis } from '../services/geminiServices.js';

export const diagnoseIssue = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    throw new ApiError(400, "Issue message is required");
  }

  // Step 1: Safety gate — runs before anything else, no AI involved
  const safetyResult = checkSafetyGate(message);
  if (safetyResult.isUnsafe) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          type: "safety_warning",
          safety: safetyResult,
        },
        "Safety-critical issue detected"
      )
    );
  }

  // Step 2: Gemini interprets the raw message into structured data
  const interpretedIssue = await interpretBikeIssue(message);

  // Step 3: Vector search — find top 3 matching KB entries
  const matches = await findBestMatches(interpretedIssue);

  if (matches.length === 0) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          type: "no_match",
          message: "Couldn't find this issue in my knowledge base. Try describing it differently.",
          interpretedIssue,
        },
        "No match found"
      )
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        type: "match_found",
        interpretedIssue,
        matches,
      },
      "Matches found"
    )
  );
});

export const concludeIssue = asyncHandler(async (req, res) => {
  const { originalIssue, causes, qaHistory } = req.body;

  if (!originalIssue || !causes || !qaHistory) {
    throw new ApiError(400, 'originalIssue, causes and qaHistory are required');
  }

  const conclusion = await concludeDiagnosis(originalIssue, causes, qaHistory);

  return res.status(200).json(
    new ApiResponse(200, { type: 'conclusion', conclusion }, 'Diagnosis concluded')
  );
});