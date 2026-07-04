import dotenv from "dotenv";
import { interpretBikeIssue } from "./geminiServices.js";
import { checkSafetyGate } from "../utils/safetyGate.js";

dotenv.config();

const testDiagnosticFlow = async () => {
  const userMessage =
     "meri activa self start nahi ho rahi bas click click awaaz aa rahi hai";

  console.log("User message:");
  console.log(userMessage);

  const safetyResult = checkSafetyGate(userMessage);

  if (safetyResult.isUnsafe) {
    console.log("\nSAFETY GATE TRIGGERED:");
    console.log(safetyResult);
    return;
  }

  const interpretedResult = await interpretBikeIssue(userMessage);

  console.log("\nGemini interpreted result:");
  console.log(JSON.stringify(interpretedResult, null, 2));
};

testDiagnosticFlow();