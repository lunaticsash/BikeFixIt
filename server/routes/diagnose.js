import { Router } from "express";
import { diagnoseIssue, concludeIssue } from "../controllers/diagnoseController.js";

const router = Router();

router.route("/").post(diagnoseIssue);
router.post('/conclude', concludeIssue);

export default router;