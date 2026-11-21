import crypto from 'crypto';
import { redis } from './redisClient.js';

const CACHE_VERSION = 'v2'; // KB reseed ya edit ke baad isse bump karo
const TTL_SECONDS = 86400;

const cacheKey = (text) => {
  const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();
  const hash = crypto.createHash('sha256').update(normalized).digest('hex');
  return `diagnosis:${CACHE_VERSION}:${hash}`;
};

export const getCached = async (message) => {
  try {
    return await redis.get(cacheKey(message));
  } catch {
    return null;
  }
};

export const setCache = async (message, data) => {
  try {
    await redis.set(cacheKey(message), data, { ex: TTL_SECONDS });
  } catch {
    // cache write failure non-critical
  }
};