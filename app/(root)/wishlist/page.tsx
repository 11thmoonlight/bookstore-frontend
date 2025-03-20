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
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";
import AddToCartButton from "@/components/AddToCartButton";

export default function WishList() {
  const { user } = useUser();

  const wishlistId = user?.wishlists?.length
    ? user.wishlists[0].documentId
    : "";

  const { wishlist, loading, error, removeFromWishlist } =
    useWishlist(wishlistId);

  const handleRemoveWishList = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (wishlist?.products.length === 0)
    return <ErrorMessage message="There are no books in  your wish list !" />;

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
                    src={`https://backend-production-dd5c.up.railway.app${item?.image[0]?.url}`}
                    alt="book image cover"
                    width={100}
                    height={200}
                    unoptimized
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

                <div className="flex md:hidden gap-6 items-center justify-center bg-amber-50 p-4 rounded-lg mb-12">
                  <AddToCartButton
                    productId={item.documentId}
                    variant="wishlist"
                    stock={item.stock}
                  />
                  <Button
                    onClick={() => handleRemoveWishList(item.documentId)}
                    className="bg-red-200 hover:bg-red-300 text-amber-900 active:scale-95 transition-all active:bg-red-200"
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
                  <AddToCartButton
                    productId={item.documentId}
                    variant="wishlist"
                    stock={item.stock}
                  />
                  <Button
                    onClick={() => handleRemoveWishList(item.documentId)}
                    className="bg-red-200 hover:bg-red-300 text-amber-900 active:scale-95 transition-all active:bg-red-200"
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
