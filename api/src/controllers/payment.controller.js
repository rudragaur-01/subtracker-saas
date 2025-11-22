import Stripe from "stripe";
import pool from "../config/database.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export const createCheckoutSession = async (req, res) => {
  try {
    const { priceId } = req.body;
    const { email, userId } = req.user;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      metadata: {
        userId: userId,
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/business-details",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({
      checkout_url: session.url,
      session_id: session.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Stripe error",
      error: error.message,
    });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, // make sure this is raw body
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  console.log("Stripe Event:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Retrieve full session with subscription and customer
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["subscription", "customer"],
    });

    const subscription = fullSession.subscription;
    const customer = fullSession.customer;

    const userId = fullSession.metadata.userId;
    const customerId = customer.id;
    const plan = subscription?.items?.data[0]?.price?.product;
    const priceId = subscription?.items?.data[0]?.price?.id;
    const startDate = new Date(subscription?.start_date * 1000);
    const endDate = new Date(subscription?.current_period_end * 1000);
    const status = subscription?.status;

    try {
      await pool.query(
        `INSERT INTO stripe_subscriptions(
          user_id,
          customer_id,
          subscription_id,
          plan,
          price_id,
          start_date,
          end_date,
          status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)`,
        [
          userId,
          customerId,
          subscription.id,
          plan,
          priceId,
          startDate,
          endDate,
          status,
        ]
      );
      console.log("Subscription saved to DB successfully!");

      await pool.query(`UPDATE users SET is_active = true WHERE id = $1`, [
        userId,
      ]);
      console.log("User marked as active successfully!");
    } catch (dbErr) {
      console.error("Database insert error:", dbErr);
    }
  }

  res.status(200).json({ received: true });
};
