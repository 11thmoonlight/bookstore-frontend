"use client";

import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useBook } from "@/hooks/useBook";
import StarRating from "@/components/StarRating";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import ErrorMessage from "@/components/custom/ErrorMessage";
import Loader from "@/components/custom/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BooksById() {
  const { id } = useParams<{ id: string }>();
  const { book, error, loading } = useBook(id);

  if (loading) {
    <Loader />;
  }

  if (error) {
    <ErrorMessage message={error} />;
  }
  return (
    <>
      <div className="flex gap-10 mt-[160px] mb-10 justify-center px-10">
        <div className="relative">
          <Image
            src={`http://localhost:1337/${book?.image[0]?.url}`}
            alt="book image cover"
            width={400}
            height={700}
          />
        </div>
        <div className="w-fit flex flex-col gap-3">
          <h2 className="font-bold text-2xl">{book?.name}</h2>
          <div className="text-lg flex gap-4 items-center">
            <Avatar>
              <AvatarImage
                src={`http://localhost:1337/${book?.authorImg.url}`}
                alt="writer image"
              />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <p>By {book?.author}</p>
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={book?.rate ?? 0} />
            <p>{book?.rate}</p>
          </div>

          <div className="text-sm">{book?.description}</div>
        </div>

        <Card className="bg-amber-50 w-full md:w-[700px] h-fit">
          <CardHeader>
            <CardTitle className="pb-4 text-amber-800 border-b-2">
              Details
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="font-bold text-amber-800">Publisher</p>
              <p className="text-amber-800">{book?.publisher}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold text-amber-800">Publication Date</p>
              <p className="text-amber-800">
                {book?.publicationYear.replaceAll("-", "/")}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold text-amber-800">Language</p>
              <p className="text-amber-800">{book?.language}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold text-amber-800">Pages</p>
              <p className="text-amber-800">{book?.pagesNum}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold text-amber-800">Genere</p>
              <p className="text-amber-800">{book?.category}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold text-amber-800">Price</p>
              <p className="text-lime-600 text-lg font-bold">{book?.price}$</p>
            </div>
            <div className="flex gap-2">
              <AddToCartButton productId={book?.documentId ?? ""} />
              <AddToWishlistButton productId={book?.documentId ?? ""} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
