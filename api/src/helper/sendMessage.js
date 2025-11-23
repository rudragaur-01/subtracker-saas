import axios from "axios";

export const sendSMS = async ({ name, phone, expiry_date, amount }) => {
  try {
    const payload = {
      template_id: process.env.MSG91_TEMPLATE_ID,
      sender: MSG91_SENDER_ID,
      short_url: "1",
      recipients: [
        {
          mobiles: `91${phone}`,
          name,
          expiry_date,
          amount,
        },
      ],
    };
    const config = {
      headers: {
        authkey: process.env.MSG91_AUTH_KEY,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "https://api.msg91.com/api/v5/flow/",
      payload,
      config
    );
    console.log("SMS sent successfully:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("SMS Error:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};
