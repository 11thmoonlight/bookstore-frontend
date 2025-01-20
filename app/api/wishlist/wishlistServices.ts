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
  },
});

// Fetch the wishlist data.

export async function getWishlist() {
  try {
    const response = await axiosInstance.get(`/api/wishlists?${query}`);
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

// Fetch a wishlist by its ID.

export async function getwishlistById(wishlistId: string) {
  try {
    const response = await axiosInstance.get(
      `/api/wishlists/${wishlistId}?${query}`
    );
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

// Add a product to the wishlist.

export async function addItemTowishlist(wishlistId: string, productId: string) {
  try {
    const response = await axiosInstance.put(`/api/wishlists/${wishlistId}`, {
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

// Remove a product from the wishlist.

export async function removeItemFromwishlist(
  wishlistId: string,
  productId: string
) {
  try {
    const response = await axiosInstance.put(`/api/wishlists/${wishlistId}`, {
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
