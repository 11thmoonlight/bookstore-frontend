"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { MdHeartBroken } from "react-icons/md";

export default function CheckoutCancel() {
  return (
    <>
      <div className="flex flex-col gap-6 justify-center items-center bg-amber-50 dark:bg-stone-800 h-screen">
        <h2 className="text-2xl font-bold text-amber-600 mb-1">
          Your order canceled
        </h2>
        <p className="mb-8 font-semibold text-amber-950 dark:text-amber-100 flex items-center justify-center gap-2">
          Please try again later{" "}
          <MdHeartBroken className="text-amber-600 text-2xl" />
        </p>
        <Button className="hover:bg-amber-200 font-bold bg-amber-100 text-amber-950 active:scale-95">
          <Link href="/cart" className="flex items-center justify-center gap-2">
            Back to your cart
            <FaArrowRight />
          </Link>
        </Button>
      </div>
    </>
  );
}
