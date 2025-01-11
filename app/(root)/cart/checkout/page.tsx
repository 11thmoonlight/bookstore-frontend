"use client";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { getCartById } from "@/data/services/cart-services";
import { getCartItemByIds } from "@/data/services/cartItem-service";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoMdArrowRoundForward } from "react-icons/io";
import { createCheckout } from "@/data/services/createCheckout";

interface CartItems {
  createdAt: string;
  documentId: string;
  products: unknown[];
  id: number;
  locale: null;
  publishedAt: null;
  updatedAt: string;
}

const formSchema = z.object({
  address: z
    .string()
    .min(10, {
      message: "Address must be at least 10 characters.",
    })
    .max(100, {
      message: "Address must be less than 100 characters.",
    }),
  phoneNumber: z.string(),
  postalCode: z.string(),
  emailAddress: z.string(),
});

export default function Checkout() {
  const { user } = useUser();
  const [items, setItems] = useState<CartItems[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);

  const discounts = items?.data?.products
    .reduce((sum, product) => {
      const quantity = quantities[product.documentId] || 0;
      return sum + product.discount * quantity;
    }, 0)
    .toFixed(2);

  const totalItems = items?.data?.products.reduce((sum, product) => {
    const quantity = quantities[product.documentId] || 0;
    return sum + quantity;
  }, 0);

  const totalPrice = items?.data?.products
    .reduce((sum, product) => {
      const quantity = quantities[product.documentId] || 0;
      return sum + product.price * quantity;
    }, 0)
    .toFixed(2);

  useEffect(() => {
    const fetchItems = async () => {
      if (user?.cart?.documentId) {
        try {
          const itemsData = await getCartById(user.cart.documentId);
          if (itemsData) {
            setItems(itemsData);

            const quantityData = {};
            for (const item of itemsData?.data?.products) {
              const { cartItemData } = await getCartItemByIds(
                user.cart.documentId,
                item.documentId
              );
              quantityData[item.documentId] = cartItemData.quantity;
            }
            setQuantities(quantityData);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchItems();
  }, [user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      phoneNumber: undefined,
      postalCode: undefined,
      emailAddress: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createCheckout(totalPrice);

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const { clientSecret } = await response.json();
      console.log("Stripe client secret:", clientSecret);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col mb-6 justify-between items-start gap-32">
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <p className="bg-amber-800 text-amber-50 p-2 rounded-sm font-bold mb-8">
          Yout Information
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="city/street/house" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="09334040400" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="371213141" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="email@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="w-1/2">
        <div className="flex flex-col gap-4">
          {items?.data?.products.map((item) => (
            <Table key={item.id} className="bg-amber-50 text-amber-800">
              <TableBody>
                <TableRow>
                  <TableCell className="flex gap-4 items-center">
                    <Image
                      src={`http://localhost:1337${item.image[0].url}`}
                      alt="book image cover"
                      width={70}
                      height={70}
                    />

                    <div className="flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-2 justify-center">
                        <p className="lg:text-lg font-normal text-sm">
                          {item.name}
                        </p>
                        <p>By {item.author}</p>
                        <p className="text-lime-600">{item.price}$</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}

          <Card className="bg-amber-50 h-fit">
            <CardHeader>
              <CardTitle className="pb-4 text-amber-800 border-b-2">
                Order Summery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-amber-800 text-sm">Items</p>
                  <p className="text-amber-800 text-sm">{totalItems}</p>
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

                <div className="flex justify-between my-4 bg-amber-100 p-2 rounded-md">
                  <p className="text-amber-800 text-base">Total</p>
                  <p className="text-lg text-lime-600 font-semibold">
                    {Number(totalPrice) + 1.25}$
                  </p>
                </div>
              </div>
            </CardContent>
            <Button className="w-full bg-lime-600 hover:bg-lime-500 font-bold text-lime-50 text-lg py-6 flex gap-2">
              <IoMdArrowRoundForward />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
