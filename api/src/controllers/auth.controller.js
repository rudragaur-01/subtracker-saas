import bcrypt from "bcrypt";
import pool from "../config/database.js";
import GenerateToken from "../helper/token.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET, // add your client secret
  `${process.env.BACKEND_URL}/auth/google/callback` // add backend callback URL
);

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const userCheck = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [username, email, hashedPassword]
    );

    const user = newUser.rows[0];

    const token = GenerateToken(user.id, user.email);

    res.status(201).json({
      message: "Signup successful",
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = GenerateToken(user.id, user.email);
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Get User info
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    console.log("payload: ", payload);

    const userCheck = await pool.query("SELECT * FROM users WHERE email=$1", [
      payload.email,
    ]);
    let user;
    if (userCheck.rows.length === 0) {
      const newUser = await pool.query(
        "INSERT INTO users (username, email, password, login_type) VALUES ($1, $2, $3, 'google') RETURNING *",
        [payload.name, payload.email, null]
      );

      user = newUser.rows[0];
    } else {
      user = userCheck.rows[0];
    }
    const token = GenerateToken(user.id, user.email);
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Google login failed");
  }
};

export const googleLogin = async (req, res) => {
  const redirectUri = `${process.env.BACKEND_URL}/auth/google/callback`;

  const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&redirect_uri=${redirectUri}`;

  res.redirect(oauthUrl);
};

export const createPassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `UPDATE users
       SET password = $1
       WHERE id = $2
       RETURNING id, username, email`,
      [hashedPassword, userId]
    );

    const updatedUser = result.rows[0];

    res.status(200).json({
      message: "Password created successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Create Password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
