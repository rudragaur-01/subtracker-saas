import pool from "../config/database.js";
export const businessDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
console.log(userId)
    const {
      businessName,
      contactNumber,
      address,
      businessType,
      industry,
      description,
      website,
    } = req.body;

    // --- Validation ---
    if (!businessName || !businessType || !address) {
      return res.status(400).json({
        message: "Business name, business type, and address are required",
      });
    }

    // --- Insert Data into business table ---
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
    console.log("----",newBusiness)

    res.status(200).json({
      message: "Business details saved successfully",
      business: newBusiness,
    });
  } catch (err) {
    console.error("Business details error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
