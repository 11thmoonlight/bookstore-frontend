import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoMdArrowRoundForward } from "react-icons/io";
import Link from "next/link";
import { Button } from "./ui/button";

interface CartSummaryProps {
  totalItems: number;
  totalPrice: string;
  discounts: string;
  variant?: "default" | "readonly";
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalItems,
  totalPrice,
  discounts,
  variant = "default",
}) => {
  return (
    <Card
      className={`bg-amber-50 h-fit ${
        variant === "readonly" ? "w-full" : "w-full md:w-96"
      }`}
    >
      <CardHeader>
        <CardTitle className="pb-4 text-amber-800 border-b-2">
          Order Summery
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-amber-800 text-sm">Items</p>
            <p className="text-amber-900 text-sm font-semibold">{totalItems}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-amber-800 text-sm">Items Total Price</p>
            <p className="text-amber-900 text-sm font-semibold">
              {totalPrice}$
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-amber-800 text-sm">Delivery</p>
            <p className="text-amber-900 text-sm font-semibold">1.25$</p>
          </div>

          <div className="flex justify-between">
            <p className="text-amber-800 text-sm">Discount</p>
            <p className="text-amber-900 text-sm font-semibold">{discounts}$</p>
          </div>

          <div className="flex justify-between my-4 bg-amber-100 p-2 rounded-md">
            <p className="text-amber-800 text-base">Total</p>
            <p className="text-lg text-lime-600 font-semibold">
              {Number(totalPrice) + 1.25}$
            </p>
          </div>
        </div>
      </CardContent>
      {variant === "default" && (
        <Button className="w-full bg-lime-600 hover:bg-lime-500 font-bold text-lime-50 text-lg py-6 flex gap-2">
          <Link href="/cart/checkout">Checkout</Link>
          <IoMdArrowRoundForward />
        </Button>
      )}
    </Card>
  );
};

export default CartSummary;
