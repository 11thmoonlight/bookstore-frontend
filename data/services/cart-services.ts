"use server";

import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./get-token";
import qs from "qs";

interface Cart {
  createdAt: string;
  documentId: string;
  products: unknown[];
  id: number;
  locale: null;
  publishedAt: null;
  updatedAt: string;
}

interface StrapiResponse<T> {
  data: T[];
}

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

export async function getCart() {
  const baseUrl = getStrapiURL();

  const url = new URL("/api/carts", baseUrl);
  url.search = query;

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

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
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}

export async function getCartById(
  id: string
): Promise<StrapiResponse<Cart> | null> {
  const baseUrl = getStrapiURL();

  const url = new URL(`/api/carts/${id}`, baseUrl);
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

export const removeFromCart = async (
  cartId: string | undefined,
  productId: string | undefined
) => {
  const authToken = await getAuthToken();
  if (!authToken) {
    return { success: false, error: "Authentication token not found" };
  }

  const baseUrl = getStrapiURL();
  const url = new URL(`/api/carts/${cartId}`, baseUrl);
  try {
    const response = await fetch(url.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          products: {
            disconnect: [{ documentId: productId }],
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Error deleting book from the cart");
    }

    const updatedCart = await response.json();
    console.log("deleting was successful", updatedCart);
  } catch (error) {
    console.error("something went wrong", error);
  }
};

export const addToCart = async (
  cartId: string | undefined,
  productId: string | undefined
) => {
  const authToken = await getAuthToken();
  if (!authToken) {
    return { success: false, error: "Authentication token not found" };
  }

  const baseUrl = getStrapiURL();
  const url = new URL(`/api/carts/${cartId}`, baseUrl);

  try {
    const response = await fetch(url.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          products: {
            connect: [{ documentId: productId }],
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Error adding book to the cart");
    }

    const updatedCart = await response.json();
    console.log("adding was successful", updatedCart);
    return updatedCart;
  } catch (error) {
    console.error("something went wrong", error);
  }
};
