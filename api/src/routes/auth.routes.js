import express from "express";
import { googleCallback, googleLogin, login, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/google", googleLogin);          
router.get("/google/callback", googleCallback);

export default router;
