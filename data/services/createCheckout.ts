import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLICATION_KEY!
);

export async function createCheckout(total: number) {
  try {
    const amountInCents = Math.round(total * 100);

    const res = await axios.post(
      "http://localhost:1337/api/create-checkout-session",
      {
        amount: amountInCents,
      }
    );

    const { id: sessionId } = res.data;

    const stripe = await stripePromise;

    const { error } = await stripe?.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error(error.message);
    }
  } catch (err) {
    console.error("Error in Checkout:", err);
  }
};