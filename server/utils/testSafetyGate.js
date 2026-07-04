import { checkSafetyGate } from "./safetyGate.js";

const userMessage =
  "meri bike se petrol smell aa rahi hai aur thoda leak bhi lag raha hai";

const result = checkSafetyGate(userMessage);

console.log(result);