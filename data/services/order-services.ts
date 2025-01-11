"use server";

import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./get-token";

interface OrderProps {
  address: string;
  phoneNumber: string;
  postalCode: string;
  emailAddress: string;
}

export async function createOrder(
  orderData: OrderProps,
  cartId: string | undefined,
  userPermissions: string | undefined
) {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/orders", baseUrl);

  const authToken = await getAuthToken();

  if (!authToken) {
    return { success: false, error: "Authentication token not found" };
  }

  try {
    const response = await fetch(url.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          cart: cartId,
          ...orderData,
          users_permissions_user: userPermissions,
        },
      }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Some error happened", error);
  }
}

export async function orderUpdate(paymentIntent: any) {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/orders", baseUrl);

  const authToken = await getAuthToken();

  if (!authToken) {
    return { success: false, error: "Authentication token not found" };
  }

  try {
    const response = await fetch(url.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          stripePaymentId: paymentIntent.id,
          amount: paymentIntent.amount_received / 100,
          status: "paid",
        },
      }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Some error happened", error);
  }
}
