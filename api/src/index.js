import express from "express";
import pool from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/admin.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// ⚠️ Mount the RAW webhook handler BEFORE express.json()
import { stripeWebhook } from "./controllers/payment.controller.js";
import bodyParser from "body-parser";

app.post(
  "/api/payment/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripeWebhook
);

// Now safe to use JSON for the rest
app.use(express.json());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json({ time: result.rows[0] });
  } catch (error) {
    res.status(500).send("Database error");
  }
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
