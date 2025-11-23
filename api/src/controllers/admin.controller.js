import pool from "../config/database.js";
import { sendMail } from "../helper/sendgridMail.js";
export const businessDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
    const {
      businessName,
      contactNumber,
      address,
      businessType,
      industry,
      description,
      website,
    } = req.body;

    if (!businessName || !businessType || !address) {
      return res.status(400).json({
        message: "Business name, business type, and address are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO business (
        user_id,
        business_name,
        contact_number,
        address,
        business_type,
        industry,
        description,
        website
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
      `,
      [
        userId,
        businessName,
        contactNumber,
        address,
        businessType,
        industry,
        description,
        website,
      ]
    );

    const newBusiness = result.rows[0];

    const joinedData = await pool.query(
      `SELECT 
        b.*, 
        u.email
        FROM business b
        INNER JOIN users u
        ON b.user_id = u.id
        WHERE b.id = $1;
        `,
      [newBusiness.id]
    );

    res.status(200).json({
      message: "Business details saved successfully",
      business: newBusiness,
    });
  } catch (err) {
    console.error("Business details error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const renewal_notif = async (req, res) => {
  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    const result = await pool.query(
      `SELECT name, email, expiry, amount FROM customers WHERE id = $1`,
      [customerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    if (!result.rows[0].email) {
      return res.status(404).json({ message: "Customer email not found" });
    }

    const customer = result.rows[0];

    // Send email
    await sendMail({
      name: customer.name,
      clientEmail: customer.email,
      expiry_date: customer.expiry,
      amount: customer.amount,
    });

    console.log("Notification email sent to:", customer.email);

    return res.status(200).json({
      message: "Renewal notification sent successfully",
      customerId,
    });
  } catch (error) {
    console.error("Error in renewal notification:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const customer_list = async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query(
      `SELECT * FROM customers WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({
      message: "Customer fetch successful",
      customers: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const createNewCustomer = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, phone, email, expiry, payment_mode, amount } = req.body;

    if (!name || !phone || !expiry || !payment_mode || !amount) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    const result = await pool.query(
      `INSERT INTO customers (user_id, name, phone, email, expiry, payment_mode ,amount)
       VALUES ($1, $2, $3, $4, $5, $6,$7)
       RETURNING *`,
      [userId, name, phone, email || null, expiry, payment_mode, amount]
    );

    return res.status(201).json({
      message: "Customer created successfully",
      customer: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
