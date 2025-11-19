import express from "express";
import pool from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use(express.json());
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
    console.error(error);
    res.status(500).send("Database error");
  }
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
