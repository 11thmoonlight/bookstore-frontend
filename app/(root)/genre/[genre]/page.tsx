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
import { getBooksByGenre } from "@/data/services/get-books";
import Image from "next/image";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { PiShoppingCartLight } from "react-icons/pi";
import Link from "next/link";

interface Image {
  url: string;
  alternativeText: string;
}

interface Books {
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

export default function Genre() {
  const { genre } = useParams<{ genre: string }>();
  const [books, setBooks] = useState<Books[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooksByGenre(genre);
        const genreBooks = data?.data;

        if (genreBooks) {
          setBooks(genreBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [genre]);

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col gap-4 mb-6 justify-center items-center">
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
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
            <CardContent className="font-bold text-lg text-center text-teal-600">
              {book.price} $
            </CardContent>
            <CardFooter className="flex justify-around items-center w-full">
              <button>
                <GoHeart size={27} />
              </button>

              <Button className="bg-amber-800 text-base hover:bg-amber-700">
                <Link href={`/book/${book.documentId}`} className="w-full">
                  More Details
                </Link>
              </Button>

              <button>
                <PiShoppingCartLight size={27} />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
