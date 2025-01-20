import { useState, useEffect } from "react";
import {
  getBooks,
  getBookById,
  getBooksByGenre,
  getBooksBySearch,
} from "@/app/api/book/bookServices";

export function useBooks() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const result = await getBooks();
      if (result.ok) {
        setBooks(result.data);
      } else {
        setError(result.error?.message || "Failed to fetch books.");
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  return {
    books,
    loading,
    error,
  };
}

export function useBook(bookId: string) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch book by ID
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      const result = await getBookById(bookId);
      if (result.ok) {
        setBook(result.data);
      } else {
        setError(result.error?.message || "Failed to fetch book.");
      }
      setLoading(false);
    };

    fetchBook();
  }, [bookId]);

  return {
    book,
    loading,
    error,
  };
}

export function useBooksByGenre(genre: string) {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch books by genre
  useEffect(() => {
    const fetchBooksByGenre = async () => {
      setLoading(true);
      const result = await getBooksByGenre(genre);
      if (result.ok) {
        setBooks(result.data);
      } else {
        setError(result.error?.message || "Failed to fetch books by genre.");
      }
      setLoading(false);
    };

    fetchBooksByGenre();
  }, [genre]);

  return {
    books,
    loading,
    error,
  };
}

export function useBooksBySearch(searchQuery: string) {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch books by search query
  useEffect(() => {
    const fetchBooksBySearch = async () => {
      setLoading(true);
      const result = await getBooksBySearch(searchQuery);
      if (result.ok) {
        setBooks(result.data);
      } else {
        setError(result.error?.message || "Failed to fetch books by search.");
      }
      setLoading(false);
    };

    fetchBooksBySearch();
  }, [searchQuery]);

  return {
    books,
    loading,
    error,
  };
}
