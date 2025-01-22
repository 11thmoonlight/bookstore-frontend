"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useCartItem } from "@/hooks/useCartItem";
import { useCart } from "@/hooks/useCart";

export default function WishList() {
  const { user } = useUser();
  const { wishlist, loading, setWishlist, removeFromWishlist } = useWishlist(
    user?.wishlists[0]?.documentId || ""
  );

  console.log("id", user?.wishlists[0]?.documentId);

  const { addToCart } = useCart(user?.cart?.documentId || "");

  const { addItemToCart } = useCartItem();

  console.log(wishlist, "wishlist");

  const handleRemoveWishList = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
      // setWishlist((prevItems) => {
      //   if (!prevItems || !prevItems.products) {
      //     return prevItems;
      //   }

      //   return {
      //     ...prevItems,
      //     data: {
      //       ...prevItems,
      //       products: prevItems.products.filter(
      //         (product) => product.documentId !== productId
      //       ),
      //     },
      //   };
      // });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId);
      await addItemToCart(user?.cart?.documentId || "", productId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-[160px] lg:px-20 md:px-10 px-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="hidden lg:flex items-center">Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        {wishlist?.products.map((item) => (
          <TableBody key={item.id}>
            <TableRow>
              <TableCell className="flex flex-col gap-8">
                <div className="flex gap-4 items-center">
                  <Image
                    src={`http://localhost:1337${item.image[0].url}`}
                    alt="book image cover"
                    width={100}
                    height={200}
                  />
                  <div className="flex flex-col justify-between gap-2">
                    <p className="font-bold text-base">{item.name}</p>
                    <p>By {item.author}</p>
                    <p className="font-bold text-lime-600 text-xl lg:hidden">
                      {item.price}$
                    </p>
                    <p className="font-bold text-lime-600">
                      {item.stock} in stock
                    </p>
                  </div>
                </div>

                <div className="flex md:hidden gap-6 items-center justify-center">
                  <Button
                    onClick={() => handleAddToCart(item.documentId)}
                    className="bg-lime-200 hover:bg-lime-300 text-lime-900"
                  >
                    Add to cart
                  </Button>
                  <Button
                    onClick={() => handleRemoveWishList(item.documentId)}
                    className="bg-red-200 hover:bg-red-300 text-amber-900"
                  >
                    Delete from wish list
                  </Button>
                </div>
              </TableCell>

              <TableCell>
                <div className="font-bold text-lime-600 text-xl hidden lg:flex">
                  {item.price}$
                </div>
              </TableCell>
              <TableCell>
                <div className="hidden md:flex gap-6 items-center justify-center">
                  <Button
                    onClick={() => handleAddToCart(item.documentId)}
                    className="bg-lime-100 hover:bg-lime-50 text-lime-900"
                  >
                    Add to cart
                  </Button>
                  <Button
                    onClick={() => handleRemoveWishList(item.documentId)}
                    className="bg-red-100 hover:bg-red-50 text-amber-900"
                  >
                    Delete from wish list
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
}
