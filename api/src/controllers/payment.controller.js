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

export const checkCustomerStatus = async (req, res) => {
  const { userId } = req.user;

  try {
    const dbResult = await pool.query(
      `SELECT * FROM stripe_subscriptions WHERE user_id = $1 AND status = 'active'`,
      [userId]
    );

    if (dbResult.rows.length > 0) {
      return res.json({
        alreadyPaid: true,
        redirectUrl: "/admin/dashboard",
      });
    }

    const customerRecord = await pool.query(
      `SELECT customer_id FROM stripe_subscriptions WHERE user_id = $1 ORDER BY id DESC LIMIT 1`,
      [userId]
    );

    if (customerRecord.rows.length > 0) {
      const customerId = customerRecord.rows[0].customer_id;
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
      });

      if (subscriptions.data.length > 0) {
        const sub = subscriptions.data[0];

        await pool.query(
          `INSERT INTO stripe_subscriptions(user_id, customer_id, subscription_id, plan, price_id, start_date, end_date, status)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
           ON CONFLICT (subscription_id) DO UPDATE SET status = EXCLUDED.status`,
          [
            userId,
            customerId,
            sub.id,
            sub.items.data[0].price.product,
            sub.items.data[0].price.id,
            new Date(sub.start_date * 1000),
            new Date(sub.current_period_end * 1000),
            sub.status,
          ]
        );

        return res.json({
          alreadyPaid: true,
          redirectUrl: "/admin/dashboard",
        });
      }
    }
    return res.json({
      alreadyPaid: false,
      redirectUrl: "/plans",
    });
  } catch (error) {
    console.error("Error checking subscription:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
