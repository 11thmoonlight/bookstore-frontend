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
          "w-full bg-amber-800 text-base transition-all hover:bg-amber-700 active:bg-amber-600 active:scale-95 font-bold text-amber-50",
        variant === "icon" &&
          "bg-stone-200 text-amber-800 hover:shadow-lg hover:bg-white active:scale-95 transition-all active:bg-stone-200"
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
