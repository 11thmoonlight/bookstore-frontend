"use client";
import { useRouter } from "next/navigation";

export default function CheckoutCancel() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Your order canceled</h2>
      <p>Please try again later</p>
      <button
        onClick={() => router.push("/cart")}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
       Back to Cart
      </button>
    </div>
  );
}