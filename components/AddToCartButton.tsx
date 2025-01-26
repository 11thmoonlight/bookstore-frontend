"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { useCart } from "@/hooks/useCart";
import { useCartItem } from "@/hooks/useCartItem";

interface AddToCartButtonProps {
  productId: string;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { user } = useUser();
  const { addToCart } = useCart(user?.cart?.documentId || "");
  const { addItemToCart } = useCartItem(user?.cart?.documentId || "");

  const handleAddToCart = async () => {
    try {
      await addToCart(productId);
      await addItemToCart(productId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="w-96 bg-amber-800 text-base hover:bg-amber-700 font-bold text-amber-50"
    >
      Add to cart
    </Button>
  );
}
