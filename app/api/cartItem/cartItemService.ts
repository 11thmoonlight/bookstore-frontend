import axiosInstance from "@/lib/axiosInstance";
import qs from "qs";

// Query for populating necessary relations
const query = qs.stringify({
  populate: "*",
});

// Get cart item by its ID
export async function getCartItemById(id: string) {
  try {
    const response = await axiosInstance.get(`/api/cart-items/${id}?${query}`);
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching cart item:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// Get cart item by cart ID and product ID
export async function getCartItemByIds(cartId: string, productId: string) {
  const query = qs.stringify({
    filters: {
      cart: { documentId: { $eq: cartId } },
      product: { documentId: { $eq: productId } },
    },
  });

  try {
    const response = await axiosInstance.get(`/api/cart-items?${query}`);
    if (response.data.data.length === 0) {
      return { ok: false, error: "Cart item not found" };
    }
    return { ok: true, data: response.data.data[0], error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching cart item:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// Update the quantity of a cart item
export async function updateCartItemQuantity(
  cartItemId: string,
  newQuantity: number
) {
  try {
    const response = await axiosInstance.put(`/api/cart-items/${cartItemId}`, {
      data: {
        quantity: newQuantity,
      },
    });
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating cart item quantity:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// Add a new cart item
export async function addCartItem(
  cartId: string,
  productId: string,
  quantity = 1
) {
  try {
    const response = await axiosInstance.post(`/api/cart-items`, {
      data: {
        cart: cartId,
        product: productId,
        quantity,
      },
    });
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding cart item:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// Remove a cart item
export async function removeCartItem(cartItemId: string) {
  try {
    await axiosInstance.delete(`/api/cart-items/${cartItemId}`);
    return { ok: true, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error removing cart item:", error.message);
      return { ok: false, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, error: new Error("Unknown error") };
    }
  }
}
