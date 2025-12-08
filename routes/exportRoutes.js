import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { exportSinglePDF, exportAllPDFs } from "../controllers/exportController.js";

const router = express.Router();

router.post("/pdf", protect, exportSinglePDF);
router.post("/pdf-all", protect, exportAllPDFs);

export default router;
