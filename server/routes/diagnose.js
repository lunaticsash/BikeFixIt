import { Router } from 'express';
import { diagnoseIssue, concludeIssue } from '../controllers/diagnoseController.js';
import { diagnoseLimiter, concludeLimiter } from '../utils/rateLimiter.js';

const router = Router();

router.route('/').post(diagnoseLimiter, diagnoseIssue);
router.post('/conclude', concludeLimiter, concludeIssue);

export default router;