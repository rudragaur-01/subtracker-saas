import express from "express";
import {
  createPassword,
  googleCallback,
  googleLogin,
  login,
  signup,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/create-password", verifyToken, createPassword);

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

export default router;
