import axiosInstance from "@/lib/axiosInstance";
import qs from "qs";

const query = qs.stringify({
  populate: {
    products: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
      },
    },
    cart_items: "*",
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
