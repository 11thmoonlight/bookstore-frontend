"use server";

import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./get-token";
import qs from "qs";

interface CartItem {
  createdAt: string;
  documentId: string;
  products: unknown[];
  cart: unknown[];
  id: number;
  locale: null;
  publishedAt: null;
  updatedAt: string;
  quantity: number;
}

interface StrapiResponse<T> {
  data: T[];
}

const query = qs.stringify({
  populate: "*",
});

export async function getCartItemById(
  id: string
): Promise<StrapiResponse<CartItem> | null> {
  const baseUrl = getStrapiURL();

  const url = new URL(`/api/cart-items/${id}`, baseUrl);
  url.search = query;

  const authToken = await getAuthToken();

  // if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getCartItemByIds = async (cartId: string, productId: string) => {
  const authToken = await getAuthToken();
  if (!authToken) {
    return { success: false, error: "Authentication token not found" };
  }

  const baseUrl = getStrapiURL();
  const url = new URL(`/api/cart-items`, baseUrl);

  url.searchParams.append("filters[cart][documentId][$eq]", cartId);
  url.searchParams.append("filters[product][documentId][$eq]", productId);

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart item quantity");
    }

    const data = await response.json();

    if (data.data.length === 0) {
      return { success: false, error: "Cart item not found" };
    }

    const cartItemData = data.data[0];
    return { success: true, cartItemData };
  } catch (error) {
    console.error("Error fetching cart item quantity:", error);
    return { success: false, error: error.message };
  }
};

export const updateCartItemQuantity = async (
  cartItemId: string,
  newQuantity: number
) => {
  const authToken = await getAuthToken();
  if (!authToken) {
    return { success: false, error: "Authentication token not found" };
  }

  const baseUrl = getStrapiURL();
  const url = new URL(`/api/cart-items/${cartItemId}`, baseUrl);

  try {
    const response = await fetch(url.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          quantity: newQuantity,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart item quantity");
    }

    const updatedCartItem = await response.json();
    console.log("Quantity updated successfully", updatedCartItem);
    return { success: true, data: updatedCartItem };
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return { success: false, error: error.message };
  }
};

export const addCartItem = async (
  cartId: string | undefined,
  productId: string | undefined,
  quantity = 1
) => {
  const authToken = await getAuthToken();
  if (!authToken) {
    return { success: false, error: "Authentication token not found" };
  }

  const baseUrl = getStrapiURL();
  const url = new URL(`/api/cart-items`, baseUrl);
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
          product: productId,
          quantity,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Error adding book to the cart");
    }

    const data = await response.json();
    console.log("adding was successful", data);
    return data;
  } catch (error) {
    console.error("something went wrong", error);
  }
};

export const removeCartItem = async (cartItemId: string | undefined) => {
  const authToken = await getAuthToken();
  if (!authToken) {
    return { success: false, error: "Authentication token not found" };
  }

  const baseUrl = getStrapiURL();
  const url = new URL(`/api/cart-items/${cartItemId}`, baseUrl);
  try {
    const response = await fetch(url.href, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error removing book from the cart");
    }

    console.log("Book removed successfully");
    return { success: true };
  } catch (error) {
    console.error("Something went wrong while removing the book", error);
    return { success: false, error: error };
  }
};
