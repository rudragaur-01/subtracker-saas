import pool from "../config/database.js";
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
