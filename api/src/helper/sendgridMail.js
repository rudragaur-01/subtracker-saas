import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async ({ name, clientEmail, expiry_date, amount }) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Membership Expiry Notice</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your gym membership expires on <strong>${expiry_date}</strong>.</p>
        <p>Please renew your membership to continue your fitness journey.</p>
        <p><strong>Amount Due:</strong> ₹${amount}</p>
        <p>Thank you!</p>
      </div>
    `;

    const msg = {
      to: clientEmail,
      from: "rudrag9870@gmail.com",
      subject: `Membership Expiring on ${expiry_date}`,
      html: htmlContent,
    };

    await sgMail.send(msg);
    console.log("Email sent successfully to", clientEmail);
  } catch (error) {
    console.error(
      "SendGrid Email Error:",
      error.response?.body || error.message
    );
    throw error; 
  }
};
