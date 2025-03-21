"use server";
import axios from "axios";
import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

// const query = "populate=*";
const query = qs.stringify({
  populate: {
    orders: "*",
    wishlist: "*",
    cart: {
      populate: {
        cart_items: "*",
      },
    },
  },
});

export async function getUserMeLoader() {
  const baseUrl = getStrapiURL();

  const url = `${baseUrl}/api/users/me?${query}`;

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.data.error) {
      return { ok: false, data: null, error: response.data.error };
    }

    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}
