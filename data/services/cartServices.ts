import axiosInstance from "@/lib/axiosInstance";
import qs from "qs";

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

// Fetch the cart data.

export async function getCart() {
  try {
    const response = await axiosInstance.get(`/api/carts?${query}`);
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching cart:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// Fetch a cart by its ID.

export async function getCartById(cartId: string) {
  try {
    const response = await axiosInstance.get(`/api/carts/${cartId}?${query}`);
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching cart:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// create new cart for a user

export async function createNewCart(userId: number | undefined) {
  try {
    const response = await axiosInstance.post(`/api/carts`, {
      data: {
        users_permissions_user: userId,
      },
    });
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating cart:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

export async function getOrCreateCart(userId: number | undefined) {
  if (!userId)
    return { ok: false, data: null, error: new Error("User ID is required") };

  try {
    const existingCart = await axiosInstance.get(
      `/api/carts?filters[users_permissions_user][id]=${userId}`
    );

    if (existingCart.data?.data?.length > 0) {
      return { ok: true, data: existingCart.data.data[0], error: null };
    }
    const response = await axiosInstance.post(`/api/carts`, {
      data: {
        users_permissions_user: userId,
      },
    });

    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error getting or creating cart:", error.message);
      return { ok: false, data: null, error };
    }
    console.error("An unexpected error occurred:", error);
    return { ok: false, data: null, error: new Error("Unknown error") };
  }
}

// Add a product to the cart.

export async function addItemToCart(cartId: string, productId: string) {
  try {
    const response = await axiosInstance.put(`/api/carts/${cartId}`, {
      data: {
        products: {
          connect: [{ documentId: productId }],
        },
      },
    });
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching cart:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// Remove a product from the cart.

export async function removeItemFromCart(cartId: string, productId: string) {
  try {
    const response = await axiosInstance.put(`/api/carts/${cartId}`, {
      data: {
        products: {
          disconnect: [{ documentId: productId }],
        },
      },
    });
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching cart:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}
