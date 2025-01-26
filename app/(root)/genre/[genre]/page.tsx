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

export default function Genre() {
  const { genre } = useParams<{ genre: string }>();
  const { books, error, loading } = useBooksByGenre(genre);

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col gap-4 mb-6 justify-center items-center">
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books?.map((book) => (
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
    </div>
  );
}
