import axiosInstance from "@/lib/axiosInstance";
import qs from "qs";

// Fetch all books
export async function getBooks() {
  const query = qs.stringify({
    populate: {
      image: { fields: ["url", "alternativeText"] },
      authorImg: { fields: ["url", "alternativeText"] },
    },
  });

  try {
    const response = await axiosInstance.get(`/api/products?${query}`);
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching books:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// Fetch a book by its ID
export async function getBookById(bookId: string) {
  const query = qs.stringify({
    populate: {
      image: { fields: ["url", "alternativeText"] },
      authorImg: { fields: ["url", "alternativeText"] },
    },
  });

  try {
    const response = await axiosInstance.get(
      `/api/products/${bookId}?${query}`
    );
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching book by ID:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// Fetch books by genre
export async function getBooksByGenre(genre: string) {
  const query = qs.stringify({
    filters: {
      category: {
        $eq: genre,
      },
    },
    populate: {
      image: { fields: ["url", "alternativeText"] },
      authorImg: { fields: ["url", "alternativeText"] },
    },
  });

  try {
    const response = await axiosInstance.get(`/api/products?${query}`);
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching books by genre:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// Fetch books by search query
export async function getBooksBySearch(searchQuery: string) {
  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $containsi: searchQuery } },
        { author: { $containsi: searchQuery } },
        { publisher: { $containsi: searchQuery } },
      ],
    },
    populate: {
      image: { fields: ["url", "alternativeText"] },
      authorImg: { fields: ["url", "alternativeText"] },
    },
  });

  try {
    const response = await axiosInstance.get(`/api/products?${query}`);
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching books by search:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
}

// Fetch new books
export const getNewBooks = async () => {
  const query = qs.stringify({
    sort: ["publishedAt:desc"],
    pagination: { limit: 8 },
    populate: "*",
  });

  try {
    const response = await axiosInstance.get(`/api/products?${query}`);
    return { ok: true, data: response.data, error: null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching new books:", error.message);
      return { ok: false, data: null, error };
    } else {
      console.error("An unexpected error occurred:", error);
      return { ok: false, data: null, error: new Error("Unknown error") };
    }
  }
};
