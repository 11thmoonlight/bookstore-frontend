import { useState, useEffect } from "react";
import {
  getBooks,
  getBookById,
  getBooksByGenre,
  getBooksBySearch,
  getNewBooks,
} from "@/data/services/bookServices";

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
        setBook(result.data.data);
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
        setBooks(result.data.data);
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


  export function useNewBooks() {
    const [books, setBooks] = useState<Book[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
  // Fetch new books
    useEffect(() => {
      const fetchNewBooks = async () => {
        setLoading(true);
        const result = await getNewBooks();
        if (result.ok) {
          setBooks(result.data.data);
        } else {
          setError(result.error?.message || "Failed to fetch books by genre.");
        }
        setLoading(false);
      };
  
      fetchNewBooks();
    }, []);
  
    return {
      books,
      loading,
      error,
    };
  }

export function useBooksBySearch(searchQuery: string) {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setBooks([]);
      setLoading(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await getBooksBySearch(searchQuery);
        if (result.ok) {
          setBooks(result.data.data);
          setError(null);
        } else {
          setBooks(null);
          setError(result.error?.message || "Failed to fetch books by search.");
        }
      } catch (error) {
        setBooks(null);
        setError("An unexpected error occurred.");
        console.log(error)
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return {
    books,
    setBooks,
    loading,
    error,
  };
}
