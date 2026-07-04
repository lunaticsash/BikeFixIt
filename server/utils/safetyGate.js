const safetyKeywords = [
  // Brake related
  "brake fail",
  "brake failure",
  "brake not working",
  "brakes not working",
  "weak brake",
  "weak brakes",
  "spongy brake",
  "brake loose",
  "brake gone",

  // Fuel leak related
  "fuel leak",
  "fuel leaking",
  "petrol leak",
  "petrol leaking",
  "petrol smell",
  "fuel smell",
  "smell of petrol",

  // Smoke related
  "smoke",
  "white smoke",
  "black smoke",
  "blue smoke",
  "smoke from silencer",
  "smoke from exhaust",

  // Burning / fire / electrical related
  "burning smell",
  "wire burning",
  "electrical burning",
  "short circuit",
  "spark",
  "fire",
  "current smell",

  // Overheating
  "engine overheating",
  "overheating",
  "engine too hot",
];

export const checkSafetyGate = (userMessage = "") => {
  const lowerMessage = userMessage.toLowerCase();

  const matchedKeyword = safetyKeywords.find((keyword) =>
    lowerMessage.includes(keyword)
  );

  // If no safety-critical keywords are found, return a safe response

  if (!matchedKeyword) {
    return {
      isUnsafe: false,
      matchedKeyword: null,
      message: null,
    };
  }

  return {
    isUnsafe: true,
    matchedKeyword,
    message:
      "This may be a safety-critical issue. Please avoid riding the vehicle and get it checked by a mechanic immediately.",
  };
};