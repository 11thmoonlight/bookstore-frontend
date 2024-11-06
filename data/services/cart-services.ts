"use server";

import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./get-token";

interface AddToCartResponse {
  success: boolean;
  data?: {
    id: number;
    book: {
      id: string;
      title: string;
    };
  };
  error?: string;
}

export async function addToCart(bookId: number): Promise<AddToCartResponse> {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/order-items", baseUrl);

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
      body: JSON.stringify({ book: bookId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to add to cart");
    }

    const data = (await response.json()) as AddToCartResponse["data"];
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || "Unknown error" };
  }
}

const query = "populate=*";

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
