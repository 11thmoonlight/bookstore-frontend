"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useBooksByGenre } from "@/hooks/useBook";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { useEffect, useState } from "react";
import PaginationComponent from "@/components/PaginationComponent";

const itemsPerPage = 1;

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

  const totalPages = books ? Math.ceil(books?.length / itemsPerPage) : 1;

  return (
    <div className="mt-[160px] lg:px-2 px-2 flex flex-col gap-20 mb-6 justify-center items-center">
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBooks?.map((book) => (
          <Card
            key={book.id}
            className="w-80 h-[420px] shadow-2xl bg-stone-100 flex flex-col justify-around items-center"
          >
            <CardHeader className="relative flex justify-center items-center mt-3 h-[200px] w-[130px]">
              <Image
                src={`http://localhost:1337${book.image[0].url}`}
                fill
                alt="book cover image"
                className="asolute shadow-xl object-cover"
              />
            </CardHeader>
            <CardTitle className="text-base text-center">{book.name}</CardTitle>
            <CardDescription className="text-center">
              {book.author}
            </CardDescription>
            <CardContent className="font-bold text-lg text-center text-lime-600">
              {book.price} $
            </CardContent>
            <CardFooter className="flex justify-around items-center w-full">
              <AddToWishlistButton productId={book.documentId} variant="icon" />
              <Button className="bg-amber-800 text-base hover:bg-amber-700">
                <Link href={`/book/${book.documentId}`} className="w-full">
                  More Details
                </Link>
              </Button>
              <AddToCartButton productId={book.documentId} variant="icon" />
            </CardFooter>
          </Card>
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
