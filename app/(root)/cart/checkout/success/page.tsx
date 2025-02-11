"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutSuccess() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {

    const storedUserInfo = localStorage.getItem("userInfo");
    const storedCart = localStorage.getItem("cart");

    if (storedUserInfo && storedCart) {
      setUserInfo(JSON.parse(storedUserInfo));
      setCart(JSON.parse(storedCart));

      fetch(`"http://localhost:1337"/api/orders/confirm-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: JSON.parse(storedUserInfo),
          cart: JSON.parse(storedCart),
        }),
      });

      localStorage.removeItem("userInfo");
      localStorage.removeItem("cart");
    } else {
      router.push("/cart");
    }
  }, [router]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Payment was successful</h2>
      <p>Your order successfully asigned</p>
    </div>
  );
}