"use client";

import React, { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { GrAdd } from "react-icons/gr";
import { FaMinus } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/userContext";
import { getCartById } from "@/data/services/cart-services";
import { IoMdArrowRoundForward } from "react-icons/io";

interface CartItems {
  createdAt: string;
  documentId: string;
  products: unknown[];
  id: number;
  locale: null;
  publishedAt: null;
  updatedAt: string;
}

export default function Cart() {
  const { user } = useUser();

  const [items, setItems] = useState<CartItems[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (user?.cart?.documentId) {
        try {
          const itemsData = await getCartById(user.cart.documentId);
          console.log("Fetched items data:", itemsData);

          if (itemsData) {
            setItems(itemsData);
          } else {
            console.error("Invalid items data structure", itemsData);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchItems();
  }, [user]);

  const discounts = items?.data?.products
    .reduce((sum, product) => sum + product.discount, 0)
    .toFixed(2);

  const totalPrice = items?.data?.products
    .reduce((sum, product) => sum + product.price, 0)
    .toFixed(2);

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col gap-4 mb-6 justify-center items-start">
      <div className="w-full flex flex-col gap-8">
        {items?.data?.products.map((item) => (
          <Table key={item.id}>
            <TableBody>
              <TableRow>
                <TableCell className="flex gap-4 items-center">
                  <Image
                    src={`http://localhost:1337${item.image[0].url}`}
                    alt="book image cover"
                    width={110}
                    height={210}
                  />

                  <div className="flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2 justify-center">
                      <p className="md:font-bold lg:text-lg font-semibold text-base">
                        {item.name}
                      </p>
                      <p>By {item.author}</p>
                      <p className="font-bold text-teal-600 text-lg lg:text-2xl">
                        {item.price}$
                      </p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Button className="bg-white hover:bg-amber-50 rounded-full">
                        <FaMinus size={18} className="text-amber-800" />
                      </Button>
                      <p>1</p>
                      <Button className="bg-white hover:bg-amber-50 rounded-full">
                        <GrAdd size={18} className="text-amber-800" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </div>
      <Card className="bg-amber-50 w-full md:w-96 h-fit">
        <CardHeader>
          <CardTitle className="pb-4 text-amber-800 border-b-2">
            Order Summery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-amber-800 text-sm">Items</p>
              <p className="text-amber-800 text-sm">
                {items?.data?.products.length}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-amber-800 text-sm">Items Total Price</p>
              <p className="text-amber-800 text-sm">{totalPrice}$</p>
            </div>

            <div className="flex justify-between">
              <p className="text-amber-800 text-sm">Delivery</p>
              <p className="text-amber-800 text-sm">1.25$</p>
            </div>

            <div className="flex justify-between">
              <p className="text-amber-800 text-sm">Discount</p>
              <p className="text-amber-800 text-sm">{discounts}$</p>
            </div>

            <div className="flex justify-between my-4 bg-stone-200 p-2 rounded-md">
              <p className="text-amber-800 text-base">Total</p>
              <p className="text-lg text-teal-600 font-semibold">
                {Number(totalPrice) + 1.25}$
              </p>
            </div>
          </div>
        </CardContent>
        <Button className="w-full bg-teal-700 hover:bg-teal-600 font-bold text-teal-50 text-lg py-6 flex gap-2">
          <p>Accept and Continue</p>
          <IoMdArrowRoundForward />
        </Button>
      </Card>
    </div>
  );
}
