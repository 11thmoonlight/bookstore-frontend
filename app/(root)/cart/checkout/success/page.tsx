"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { PacmanLoader } from "react-spinners";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { useCreateOrder } from "@/hooks/useOrder";

export default function Success() {
  const { createNewOrder, loading, error, setLoading } = useCreateOrder();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const isOrderCreated = useRef(false);

  useEffect(() => {
    if (!session_id || isOrderCreated.current) return;

    isOrderCreated.current = true;
    (async () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      const shippingInfo = JSON.parse(
        localStorage.getItem("shippingInfo") || "{}"
      );

      if (cart && shippingInfo.address) {
        await createNewOrder(shippingInfo, session_id);

        if (error) {
          console.error("Order creation error:", error);
        } else {
          localStorage.removeItem("cart");
          localStorage.removeItem("shippingInfo");
        }
      }

      setLoading(false);
    })();
  }, [session_id, createNewOrder, error, setLoading]);

  return loading ? (
    <div className="flex flex-col gap-6 justify-center items-center bg-amber-50 dark:bg-stone-800 h-screen">
      <p className="text-lg font-semibold text-amber-600">Payment Processing</p>
      <PacmanLoader size={20} color={"#ff6f00"} />
    </div>
  ) : (
    <div className="flex flex-col gap-6 justify-center items-center bg-amber-50 dark:bg-stone-800 h-screen">
      <p className="text-lg font-semibold text-amber-600">
        The payment was successful, and your order has been placed.
      </p>
      <Button className="hover:bg-amber-200 font-bold bg-amber-100 text-amber-950 active:scale-95">
        <Link href="/order" className="flex items-center justify-center gap-2">
          Check your order progress.
          <FaArrowRight />
        </Link>
      </Button>
    </div>
  );
}
