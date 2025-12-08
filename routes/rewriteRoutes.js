import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { rewriteText } from "../controllers/rewriteController.js";

const router = express.Router();

router.post("/rewrite", protect, rewriteText);

export default router;
