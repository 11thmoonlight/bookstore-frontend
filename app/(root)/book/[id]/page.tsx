"use client";

import { getBookById } from "@/data/services/get-books";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import {
  addToCart,
  updateCartItemQuantity,
} from "@/data/services/cart-services";
import { useUser } from "@/context/userContext";
import { addToWishList } from "@/data/services/wishList-services";

interface Image {
  url: string;
  alternativeText: string;
}

interface AuthorImage {
  url: string;
  alternativeText: string;
}

interface Books {
  author: string;
  category: string;
  createdAt: string;
  authorImg: AuthorImage[];
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

export default function BooksById() {
  const { user } = useUser();
  console.log("user", user?.wishlists);
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Books | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBookById(id);
        const idBook = data?.data;
        console.log(idBook);

        if (idBook) {
          setBook(idBook);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const response = await addToCart(user?.cart.documentId, book?.documentId);

      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishList = async () => {
    try {
      const response = await addToWishList(
        user?.wishlists[0].documentId,
        book?.documentId
      );

      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // const cartItemId = "CART_ITEM_ID"; // آی‌دی آیتم مربوطه
  // const currentQuantity = 3; // مقدار فعلی که از سرور گرفتی
  // await updateCartItemQuantity(cartItemId, currentQuantity + 1);

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
            <div className="flex">
              <IoStar className="text-amber-600" />
              <IoStar className="text-amber-600" />
              <IoStar className="text-amber-600" />
              <IoStar className="text-amber-600" />
              <IoStarHalf className="text-amber-600" />
            </div>

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
              <p className="text-teal-700 text-lg font-bold">{book?.price}$</p>
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-96 bg-amber-800 text-base hover:bg-amber-700 font-bold text-amber-50"
          >
            Add to cart
          </Button>
          <Button
            onClick={handleAddToWishList}
            className="w-96 bg-amber-800 text-base hover:bg-amber-700 font-bold text-amber-50"
          >
            Add to wish list
          </Button>
        </div>
      </div>
    </>
  );
}
