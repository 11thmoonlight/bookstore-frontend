"use server";

import { getStrapiURL } from "@/lib/utils";

import type { NextApiRequest, NextApiResponse } from "next";

interface CartRequestBody {
  bookId: string;
  userId: string;
}

export default async function addToCart(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/order-items", baseUrl);

  if (req.method === "POST") {
    const { bookId, userId }: CartRequestBody = req.body;

    try {
      const response = await fetch(url.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book: bookId,
          user: userId,
        }),
      });

      if (response.ok) {
        const cartItem = await response.json();
        res.status(200).json(cartItem);
      } else {
        res.status(response.status).json({ message: "Failed to add to cart" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

import React, { useState } from "react";
import { addToCart } from "@/path/to/your/addToCartFunction";

const AddToCartButton = ({ bookId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await addToCart(bookId);
      if (response.success) {
        setSuccess(true); // عملیات موفق بود
      } else {
        setError(response.error || "خطا در افزودن به سبد خرید");
      }
    } catch (err) {
      setError(err.message || "خطای نامشخص");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">محصول با موفقیت به سبد خرید اضافه شد!</p>
      )}
    </div>
  );
};

export default AddToCartButton;
