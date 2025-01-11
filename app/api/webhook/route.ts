import Stripe from "stripe";
import { createOrder } from "@/data/services/order-services";
import { useUser } from "@/context/userContext";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

interface OrderData {
  address: string;
  phoneNumber: string;
  postalCode: string;
  emailAddress: string;
}

export async function StripeWebhookHandler(
  request: Request
): Promise<{ status: number; body: object }> {
  const { user } = useUser();
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        const orderData: OrderData = {
          address: paymentIntent.metadata?.address || "Default Address",
          phoneNumber: paymentIntent.metadata?.phoneNumber || "000-000-0000",
          postalCode: paymentIntent.metadata?.postalCode || "000000",
          emailAddress: paymentIntent.receipt_email || "default@example.com",
        };

        const cartId = user?.cart?.documentId;
        const userPermissions = user?.documentId;

        console.log(paymentIntent.metadata);

        const orderResponse = await createOrder(
          orderData,
          cartId,
          userPermissions
        );

        console.log("Order created successfully:", orderResponse);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { status: 200, body: { received: true } };
  } catch (err) {
    console.error("Webhook Error:", err);
    return {
      status: 400,
      body: { error: `Webhook Error: ${(err as Error).message}` },
    };
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle raw body
  },
};

// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia",
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const sig = req.headers["stripe-signature"] as string;
//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
//   } catch (err) {
//     console.error("Webhook signature verification failed.", err);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event
//   switch (event.type) {
//     case "payment_intent.succeeded":
//       {
//         const paymentIntent = event.data.object as Stripe.PaymentIntent;
//         console.log("PaymentIntent was successful!", paymentIntent);
//       }
//       // Handle successful payment here
//       break;
//     case "payment_intent.payment_failed":
//       const paymentFailedIntent = event.data.object as Stripe.PaymentIntent;
//       console.log("PaymentIntent failed.", paymentFailedIntent);
//       // Handle failed payment here
//       break;
//     // Add other event types as needed
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   res.status(200).json({ received: true });
// }

// export const config = {
//   api: {
//     bodyParser: false, // Disable body parsing to handle raw body
//   },
// };
