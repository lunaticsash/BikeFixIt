import { redis } from '../services/redisClient.js';

export const createRateLimiter = ({ prefix, limit, windowSec }) =>
  async (req, res, next) => {
    const key = `ratelimit:${prefix}:${req.ip}`;
    try {
      const count = await redis.incr(key);
      if (count === 1) await redis.expire(key, windowSec);

      if (count > limit) {
        return res.status(429).json({
          statusCode: 429,
          success: false,
          message: 'Too many requests. Please try again later.',
        });
      }
      next();
    } catch {
      next(); // fail open
    }
  };

export const diagnoseLimiter = createRateLimiter({ prefix: 'diagnose', limit: 10, windowSec: 3600 });
export const concludeLimiter = createRateLimiter({ prefix: 'conclude', limit: 10, windowSec: 3600 });