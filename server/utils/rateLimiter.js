import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const LIMIT = 10; // requests per window
const WINDOW = 60 * 60; // 1 hour in seconds

export const rateLimiter = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  const key = `ratelimit:${ip}`;

  try {
    const count = await redis.incr(key);

    if (count === 1) {
      // First request — set expiry
      await redis.expire(key, WINDOW);
    }

    if (count > LIMIT) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again after an hour.',
      });
    }

    next();
  } catch {
    // Redis down — fail open (don't block users)
    next();
  }
};