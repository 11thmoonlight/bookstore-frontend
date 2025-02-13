"use client";

import { useParams } from "next/navigation";
import { useBooksByGenre } from "@/hooks/useBook";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { useEffect, useState } from "react";
import PaginationComponent from "@/components/PaginationComponent";
import BookCard from "@/components/BookCard";

const itemsPerPage = 8;

export default function Genre() {
  const { genre } = useParams<{ genre: string }>();
  const { books, error, loading } = useBooksByGenre(genre);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedBooks, setPaginatedBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (books) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      setPaginatedBooks(books.slice(startIndex, startIndex + itemsPerPage));
    }
  }, [books, currentPage]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;
  if (books?.length === 0) return <ErrorMessage message="It looks like there are no books available in this genre yet !"/>

  const totalPages = books ? Math.ceil(books?.length / itemsPerPage) : 1;


  return (
    <div className="mt-[160px] lg:px-2 px-2 flex flex-col gap-20 mb-6 justify-center items-center">
      <div className="flex flex-wrap justify-center gap-6">
        {paginatedBooks?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
