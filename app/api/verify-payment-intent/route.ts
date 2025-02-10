import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { session_id } = req.body;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const orderData = {
      address: session?.metadata?.address,
      phoneNumber: session?.metadata?.phoneNumber,
      postalCode: session?.metadata?.postalCode,
      emailAddress: session?.customer_email,
      cartId: session?.metadata?.cartId,
      userPermissions: session?.metadata?.userId,
    };

    const strapiResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`, {
      data: orderData,
    });

    res.status(200).json(strapiResponse.data);
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
}