"use client"

import { useNewBooks } from "@/hooks/useBook"; 
import BookCard from "./BookCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

export default function NewArrivals() {
const {books, error, loading} = useNewBooks()

  return (
    <div className="px-6 mb-28 mt-14">
      <div className="flex items-center justify-center w-full my-8">
        <div className="flex-grow border-t border-gray-300 border-2 border-dashed" />
        <h1 className="mx-4 text-3xl font-bold text-center text-amber-600 font-mono">
          New Arrivals
        </h1>
        <div className="flex-grow border-t border-gray-300 border-2 border-dashed" />
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {books?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      
    </div>
  );
}
