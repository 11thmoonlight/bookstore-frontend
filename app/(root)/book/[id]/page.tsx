"use client";

import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { useUser } from "@/context/userContext";
import { useBook } from "@/hooks/useBook";
import { useCartItem } from "@/hooks/useCartItem";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export default function BooksById() {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  const { book, error, loading } = useBook(id);
  const { addToCart } = useCart(user?.cart?.documentId || "");
  const { addToWishList } = useWishlist(user?.wishlists.documentId || "");
  const { addItemToCart } = useCartItem();

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

  const StarRating = (rating: number) => {
    const renderStars = () => {
      const stars: JSX.Element[] = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

      for (let i = 0; i < fullStars; i++) {
        stars.push(<IoStar key={`full-${i}`} className="text-amber-600" />);
      }

      if (hasHalfStar) {
        stars.push(<IoStarHalf key="half" className="text-amber-600" />);
      }

      for (let i = 0; i < emptyStars; i++) {
        stars.push(
          <IoStarOutline key={`empty-${i}`} className="text-amber-600" />
        );
      }

      return stars;
    };

    return <div className="flex">{renderStars()}</div>;
  };

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
            {StarRating(book?.rate)}

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
          <Button
            onClick={() => handleAddToCart(book?.documentId)}
            className="w-96 bg-amber-800 text-base hover:bg-amber-700 font-bold text-amber-50"
          >
            Add to cart
          </Button>
          <Button
            onClick={() => handleAddToWishList(book?.documentId)}
            className="w-96 bg-amber-800 text-base hover:bg-amber-700 font-bold text-amber-50"
          >
            Add to wish list
          </Button>
        </div>
      </div>
    </>
  );
}
