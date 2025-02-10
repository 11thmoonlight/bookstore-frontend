import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

interface RequestBody {
  address: string;
  phoneNumber: string;
  postalCode: string;
  emailAddress: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      const { address, phoneNumber, postalCode, emailAddress } =
        req.body as RequestBody;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: "usd",
        receipt_email: emailAddress,
        metadata: {
          address,
          phoneNumber,
          postalCode,
        },
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}