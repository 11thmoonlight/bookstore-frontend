import axiosInstance from "@/lib/axiosInstance";
import qs from "qs";

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
export async function getOrder(userId: number) {
  const query = qs.stringify({
    filters: {
      orderStatus: {
        $in: ["order placed", "processing", "shipped"],
      },
      users_permissions_user: {
        id: {
          $eq: userId,
        },
      },
    },
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

  try {
    const response = await axiosInstance.get(`/api/orders?${query}`);
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching filtered orders:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// get delivered orders
export async function getDeliveredOrders(userId: number) {
  const query = qs.stringify({
    filters: {
      orderStatus: {
        $eq: "delivered",
      },
      users_permissions_user: {
        id: {
          $eq: userId,
        },
      },
    },
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

  try {
    const response = await axiosInstance.get(`/api/orders?${query}`);
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching delivered orders:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}
