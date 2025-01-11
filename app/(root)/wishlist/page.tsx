"use client";

import React, { useEffect, useState } from "react";
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
import {
  getWhishListById,
  removeFromWishList,
} from "@/data/services/wishList-services";
import { useUser } from "@/context/userContext";
import { addToCart } from "@/data/services/cart-services";
import { addCartItem } from "@/data/services/cartItem-service";
import { toast } from "react-toastify";

interface WhishListItems {
  createdAt: string;
  documentId: string;
  products: unknown[];
  id: number;
  locale: null;
  publishedAt: null;
  updatedAt: string;
}

export default function WishList() {
  const { user } = useUser();

  const [items, setItems] = useState<WhishListItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      if (user?.wishlists[0]?.documentId) {
        try {
          const itemsData = await getWhishListById(
            user.wishlists[0].documentId
          );

          if (itemsData) {
            setItems(itemsData);
          } else {
            console.error("Invalid items data structure", itemsData);
          }
        } catch (error) {
          console.error("Error fetching whish list items:", error);
        }
      }
    };

    fetchItems();
  }, [user]);

  const handleRemoveWishList = async (
    wishListId: string | undefined,
    productId: string | undefined
  ) => {
    try {
      await removeFromWishList(wishListId, productId);

      setItems((prevItems) => ({
        ...prevItems,
        data: {
          ...prevItems.data,
          products: prevItems.data.products.filter(
            (product) => product.documentId !== productId
          ),
        },
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (bookId: string) => {
    setLoading(true);
    try {
      await addToCart(user?.cart.documentId, bookId);
      await addCartItem(user?.cart.documentId, bookId);
      console.log("Success Toast");
      toast.success("Book added to the wish list successfully");
    } catch (err) {
      console.error(err);
      console.log("Error Toast");
      toast.error("Error adding book to the wish list");
    } finally {
      setLoading(false);
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
        {items?.data?.products.map((item) => (
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
                    onClick={() =>
                      handleRemoveWishList(
                        user?.wishlists[0].documentId,
                        item.documentId
                      )
                    }
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
                    onClick={() =>
                      handleRemoveWishList(
                        user?.wishlists[0].documentId,
                        item.documentId
                      )
                    }
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
