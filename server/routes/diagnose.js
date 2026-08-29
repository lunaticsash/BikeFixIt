import { Router } from "express";
import { diagnoseIssue, concludeIssue } from "../controllers/diagnoseController.js";
import { rateLimiter } from "../utils/rateLimiter.js";

const router = Router();

router.route("/").post(rateLimiter, diagnoseIssue);
router.post('/conclude', concludeIssue);

export default router;