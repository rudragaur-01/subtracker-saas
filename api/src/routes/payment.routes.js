import express from "express";
import { checkCustomerStatus, createCheckoutSession } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout", authMiddleware, createCheckoutSession);
router.get("/check-user-status", authMiddleware, checkCustomerStatus);

export default router;
