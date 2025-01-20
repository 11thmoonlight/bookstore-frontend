"use server";

import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

interface StrapiResponse<T> {
  data: T[];
}

const query = qs.stringify({
  populate: {
    image: { fields: ["url", "alternativeText"] },
    authorImg: { fields: ["url", "alternativeText"] },
  },
});

export async function getBooks() {
  const baseUrl = getStrapiURL();

  const url = new URL("/api/products", baseUrl);
  url.search = query;

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBookById(
  id: string
): Promise<StrapiResponse<Book> | null> {
  const baseUrl = getStrapiURL();

  const url = new URL(`/api/products/${id}`, baseUrl);
  url.search = query;

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getBooksByGenre(
  genre?: string
): Promise<StrapiResponse<Book> | null> {
  const query = qs.stringify({
    filters: genre
      ? {
          category: {
            $eq: genre,
          },
        }
      : {},
    populate: {
      image: { fields: ["url", "alternativeText"] },
      authorImg: { fields: ["url", "alternativeText"] },
    },
  });

  const baseUrl = getStrapiURL();
  const url = new URL("/api/products", baseUrl);
  url.search = query;

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });

    const data: StrapiResponse<Book> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getBooksBySearch(
  searchQuery?: string
): Promise<StrapiResponse<Book> | null> {
  const query = qs.stringify({
    filters: {
      ...(searchQuery && {
        $or: [
          { name: { $containsi: searchQuery } },
          { author: { $containsi: searchQuery } },
          { publisher: { $containsi: searchQuery } },
        ],
      }),
    },
    populate: {
      image: { fields: ["url", "alternativeText"] },
      authorImg: { fields: ["url", "alternativeText"] },
    },
  });

  const baseUrl = getStrapiURL();
  const url = new URL("/api/products", baseUrl);
  url.search = query;

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });

    const data: StrapiResponse<Book> = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
