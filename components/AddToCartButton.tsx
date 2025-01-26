"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { useCart } from "@/hooks/useCart";
import { useCartItem } from "@/hooks/useCartItem";
import { cn } from "@/lib/utils";
import { PiShoppingCartLight } from "react-icons/pi";

interface AddToCartButtonProps {
  productId: string;
  variant?: "default" | "icon";
}

export default function AddToCartButton({
  productId,
  variant = "default",
}: AddToCartButtonProps) {
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
      className={cn(
        variant === "default" &&
          "w-96 bg-amber-800 text-base hover:bg-amber-700 font-bold text-amber-50",
        variant === "icon" &&
          "bg-wight text-amber-800 hover:shadow-lg hover:bg-white"
      )}
    >
      {variant === "default" ? (
        "Add to cart"
      ) : (
        <PiShoppingCartLight size={27} />
      )}
    </Button>
  );
}
