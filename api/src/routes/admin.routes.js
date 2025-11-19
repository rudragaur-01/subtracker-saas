import express from "express";
import { businessDetails } from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/business-details", verifyToken, businessDetails);

export default router;
