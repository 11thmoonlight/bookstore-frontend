"use client";

import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useBook } from "@/hooks/useBook";
import StarRating from "@/components/StarRating";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";

export default function BooksById() {
  const { id } = useParams<{ id: string }>();
  const { book, error, loading } = useBook(id);

  return (
    <>
      <div className="flex gap-10 mt-[160px] mb-10 justify-center px-10">
        <div className="relative">
          {!loading && (
            <Image
              src={`http://localhost:1337${book?.image[0]?.url}`}
              alt="book image cover"
              width={400}
              height={700}
            />
          )}
        </div>
        <div className="w-fit flex flex-col gap-3">
          <h2 className="font-bold text-2xl">{book?.name}</h2>
          <div className="text-lg flex gap-4 items-center">
            <Avatar>
              <AvatarImage
                src={`http://localhost:1337${book?.authorImg.url}`}
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

          <div className="w-96 flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="font-bold">Publisher</p>
              <p>{book?.publisher}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Publication Date</p>
              <p>{book?.publicationYear.replaceAll("-", "/")}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Language</p>
              <p>{book?.language}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Pages</p>
              <p>{book?.pagesNum}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Genere</p>
              <p>{book?.category}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Price</p>
              <p className="text-lime-600 text-lg font-bold">{book?.price}$</p>
            </div>
          </div>
          <AddToCartButton productId={book?.documentId ?? ""} />
          <AddToWishlistButton productId={book?.documentId ?? ""} />
        </div>
      </div>
    </>
  );
}
