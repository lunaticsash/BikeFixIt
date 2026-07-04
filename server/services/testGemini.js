import dotenv from "dotenv";
import { interpretBikeIssue } from "./geminiServices.js";

dotenv.config();

const testGemini = async () => {
  const userMessage =
    "meri activa self start nahi ho rahi bas click click awaaz aa rahi hai";

  const result = await interpretBikeIssue(userMessage);

  console.log("Gemini interpreted result:");
  console.log(JSON.stringify(result, null, 2));
};

testGemini();