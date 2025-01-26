"use client";

import React, { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { GrAdd } from "react-icons/gr";
import { FaMinus } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/userContext";
import { useCartItem } from "@/hooks/useCartItem";
import { IoMdArrowRoundForward } from "react-icons/io";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function Cart() {
  const { user } = useUser();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { cart, loading, error, setCart, removeFromCart } = useCart(
    user?.cart?.documentId || ""
  );
  const {
    loading: cartItemLoading,
    error: cartItemError,
    fetchCartItemByIds,
    updateQuantity,
    removeItemFromCart,
  } = useCartItem(user?.cart.documentId || "");

  useEffect(() => {
    const fetchQuantities = async () => {
      if (user?.cart?.documentId && cart?.products?.length) {
        const quantityData: Record<string, number> = {};
        const promises = cart.products.map(async (item) => {
          const data = await fetchCartItemByIds(item.documentId);
          if (data) {
            quantityData[item.documentId] = data.quantity;
          }
        });

        await Promise.all(promises);
        setQuantities(quantityData);
      }
    };

    fetchQuantities();
  }, [cart?.products, user?.cart?.documentId]);

  const handleIncreaseItem = async (productId: string) => {
    if (!user?.cart?.documentId || !cart?.products?.length) return;

    try {
      const cartItemData = await fetchCartItemByIds(productId);
      const newQuantity = cartItemData.quantity + 1;

      const response = await updateQuantity(
        cartItemData.documentId,
        newQuantity
      );

      if (response) {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [productId]: newQuantity,
        }));
      }
    } catch (err) {
      console.error("Error increasing item quantity:", err);
    }
  };

  const handleDecreaseItem = async (productId: string) => {
    if (!user?.cart?.documentId) return;

    try {
      const cartItemData = await fetchCartItemByIds(productId);

      const { documentId: cartItemId, quantity } = cartItemData;

      if (quantity > 1) {
        const response = await updateQuantity(cartItemId, quantity - 1);

        if (response) {
          setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
          }));
        }
      } else {
        await removeFromCart(productId);
        await removeItemFromCart(cartItemId);

        setCart((prevItems) => {
          if (!prevItems || !prevItems.products) {
            return prevItems;
          }

          return {
            ...prevItems,
            products: prevItems.products.filter(
              (product) => product.documentId !== productId
            ),
          };
        });
      }
    } catch (err) {
      console.error("Error decreasing item quantity:", err);
    }
  };

  const discounts = cart?.products?.length
    ? cart.products
        .reduce((sum, product) => {
          const quantity = quantities[product.documentId] || 0;
          return sum + product.discount * quantity;
        }, 0)
        .toFixed(2)
    : "0.00";

  const totalPrice = cart?.products?.length
    ? cart.products
        .reduce((sum, product) => {
          const quantity = quantities[product.documentId] || 0;
          return sum + product.price * quantity;
        }, 0)
        .toFixed(2)
    : "0.00";

  const totalItems = cart?.products?.length
    ? cart.products.reduce((sum, product) => {
        const quantity = quantities[product.documentId] || 0;
        return sum + quantity;
      }, 0)
    : 0;

  console.log("cart", cart);

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col gap-4 mb-6 justify-center items-start">
      <div className="w-full flex flex-col gap-8">
        {cart?.products.map((item) => (
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
                      <p className="font-bold text-lime-600 text-lg lg:text-2xl">
                        {item.price}$
                      </p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Button
                        onClick={() => handleDecreaseItem(item.documentId)}
                        className="bg-white hover:bg-amber-50 rounded-full"
                      >
                        <FaMinus size={18} className="text-amber-800" />
                      </Button>
                      <p>{quantities[item.documentId]}</p>
                      <Button
                        onClick={() => handleIncreaseItem(item.documentId)}
                        className="bg-white hover:bg-amber-50 rounded-full"
                        disabled={quantities[item.documentId] >= item.stock}
                      >
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
          <Link href="/cart/checkout">Checkout</Link>
          <IoMdArrowRoundForward />
        </Button>
      </Card>
    </div>
  );
}
