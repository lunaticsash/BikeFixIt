import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Gemini is used only to understand messy user language.
 * It should NOT give final repair advice, cost, or diagnosis.
 * Final diagnosis will come from our MongoDB knowledge base.
 */
export const interpretBikeIssue = async (userMessage) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing from .env");
    }

    const prompt = `
You are working inside an India-focused petrol bike/scooter diagnostic app called bike-fixit.

Your job:
- Understand the user's messy language.
- Extract vehicle type, symptoms, safety flags, and useful search keywords.
- Do NOT give final diagnosis.
- Do NOT give repair steps.
- Do NOT give cost estimate.
- Return ONLY valid JSON.
- No markdown.
- No explanation.

Important:
This app is only for petrol commuter bikes and scooters in India.
Examples: Activa, Jupiter, Access, Splendor, Passion, Shine, Pulsar, Apache, Platina.
Do not treat EV issues as supported.

Safety flags include:
- brake issue
- brake failure
- weak brakes
- fuel leak
- petrol leak
- petrol smell
- smoke
- burning smell
- electrical short
- fire
- overheating

Return exactly this JSON shape:
{
  "vehicle_type": "bike" | "scooter" | "unknown",
  "symptoms": ["string"],
  "safety_flags": ["string"],
  "likely_keywords": ["string"],
  "cleaned_user_issue": "string"
}

User message:
"${userMessage}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let rawText = response.text;

    rawText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(rawText);

    return {
      vehicle_type: parsed.vehicle_type || "unknown",
      symptoms: Array.isArray(parsed.symptoms) ? parsed.symptoms : [],
      safety_flags: Array.isArray(parsed.safety_flags) ? parsed.safety_flags : [],
      likely_keywords: Array.isArray(parsed.likely_keywords)
        ? parsed.likely_keywords
        : [],
      cleaned_user_issue: parsed.cleaned_user_issue || userMessage,
    };
  } catch (error) {
    console.error("Gemini Service Error:", error.message);

    return {
      vehicle_type: "unknown",
      symptoms: [userMessage],
      safety_flags: [],
      likely_keywords: [],
      cleaned_user_issue: userMessage,
    };
  }
};





export const concludeDiagnosis = async (originalIssue, causes, qaHistory) => {
  const qaText = qaHistory
    .map((qa, i) => `Q${i + 1}: ${qa.question}\nAnswer: ${qa.answer}`)
    .join('\n');

  const causesText = causes
    .map((c) => `- ${c.name}: ${c.fix} (${c.est_cost_range})`)
    .join('\n');

  const prompt = `
You are a senior Indian bike mechanic giving a final diagnosis.

Original issue reported: "${originalIssue}"

Possible causes identified:
${causesText}

Follow-up questions and user's answers:
${qaText}

Based on the user's answers, pick the SINGLE most likely cause from the list above.

Respond ONLY in this exact JSON format, no extra text, no markdown:
{
  "concluded_cause": "exact cause name from the list",
  "explanation": "1-2 lines explaining why this cause matches the answers",
  "next_step": "one clear action the user should take right now",
  "est_cost": "cost range for this specific cause"
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let rawText = response.text;
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(rawText);
  } catch (error) {
    console.error("concludeDiagnosis error:", error.message);
    throw error;
  }
};