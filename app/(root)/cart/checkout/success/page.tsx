"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCartManager } from "@/hooks/useCartManager";
import { createOrder } from "@/data/services/order-services";
import { PacmanLoader } from "react-spinners";

export default function Success() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const { totalPrice } = useCartManager();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session_id) return;

    (async () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      const shippingInfo = JSON.parse(
        localStorage.getItem("shippingInfo") || "{}"
      );

      console.log(shippingInfo, "shipping");

      if (cart && shippingInfo.address) {
        const res = await createOrder(
          {
            address: shippingInfo.address,
            phoneNumber: Number(shippingInfo.phoneNumber),
            postalCode: Number(shippingInfo.postalCode),
            emailAddress: shippingInfo.emailAddress,
          },
          cart.documentId,
          session_id,
          Number(totalPrice)
        );

        if (res?.error) {
          console.error("Order creation error:", res.error);
        } else {
          localStorage.removeItem("cart");
          localStorage.removeItem("shippingInfo");
        }
      }

      setLoading(false);
    })();
  }, [session_id]);

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
    </div>
  );
}
