import axiosInstance from "@/lib/axiosInstance";
import qs from "qs";

// Query for populating necessary relations
const query = qs.stringify({
  populate: {
    cart_items: {
      populate: {
        product: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
      },
    },
  },
});

// create new order
export async function createOrder(
  orderData: OrderProps,
  stripePaymentId: string
) {
  try {
    const response = await axiosInstance.post("/api/orders", {
      data: {
        ...orderData,
        stripePaymentId,
        orderStatus: "order placed",
      },
    });
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating order:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// get order
export async function getOrder(orderId: string) {
  try {
    const response = await axiosInstance.get(
      `/api/orders/${orderId}?${query}`,
      {}
    );

    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching order:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}
