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
import { GoHeart } from "react-icons/go";
import { PiShoppingCartLight } from "react-icons/pi";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { useBooksByGenre } from "@/hooks/useBook";
import { addItemToCart } from "@/app/api/cart/cartServices";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export default function Genre() {
  const { user } = useUser();
  const { genre } = useParams<{ genre: string }>();
  const { books, error, loading } = useBooksByGenre(genre);
  const { addToCart } = useCart(user?.cart?.documentId || "");
  const { addToWishList } = useWishlist(user?.wishlists.documentId || "");

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId);
      await addItemToCart(user?.cart?.documentId || "", productId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToWishList = async (productId: string) => {
    try {
      await addToWishList(productId);
    } catch (err) {
      console.error(err);
    }
  };

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
              <button onClick={() => handleAddToWishList(book.documentId)}>
                <GoHeart size={27} />
              </button>

              <Button className="bg-amber-800 text-base hover:bg-amber-700">
                <Link href={`/book/${book.documentId}`} className="w-full">
                  More Details
                </Link>
              </Button>

              <button onClick={() => handleAddToCart(book.documentId)}>
                <PiShoppingCartLight size={27} />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
