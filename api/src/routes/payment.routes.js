import express from "express";
import { createCheckoutSession } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout", authMiddleware, createCheckoutSession);

export default router;
