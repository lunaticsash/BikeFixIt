import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Cache a diagnosis result for 24 hours
const cacheKey = (text) =>
  `diagnosis:${text.toLowerCase().trim().slice(0, 100)}`;

export const getCached = async (userMessage) => {
  try {
    const key = cacheKey(userMessage);
    return await redis.get(key);
  } catch {
    return null; // cache miss — continue normally
  }
};

export const setCache = async (userMessage, result) => {
  try {
    const key = cacheKey(userMessage);
    await redis.set(key, JSON.stringify(result), { ex: 86400 }); // 24hr TTL
  } catch {
    // cache write failure is non-critical — don't crash the app
  }
};