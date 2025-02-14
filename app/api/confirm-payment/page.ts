import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id as string);

    if (session.payment_status === 'paid') {
      return res.json({ success: true });
    }

    return res.json({ success: false });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}