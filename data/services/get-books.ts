"use server";

import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

interface Image {
  url: string;
  alternativeText: string;
}

interface Book {
  author: string;
  category: string;
  createdAt: string;
  description: string;
  discount: number;
  documentId: string;
  id: number;
  image: Image[];
  language: string;
  locale: null;
  name: string;
  pagesNum: number;
  price: number;
  publicationYear: string;
  publishedAt: string;
  publisher: string;
  rate: number;
  stock: number;
  updatedAt: string;
}

interface StrapiResponse<T> {
  data: T[];
}

const query = qs.stringify({
  populate: { image: { fields: ["url", "alternativeText"] } },
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
    console.log(data);
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
    populate: { image: { fields: ["url", "alternativeText"] } },
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
