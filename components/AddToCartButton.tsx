"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { useCartItem } from "@/hooks/useCartItem";
import { useCartManager } from "@/hooks/useCartManager";
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
  const { addItemToCart } = useCartItem(user?.cart?.documentId || "");
  const { products, setCart } = useCartManager();

  const isDisabled = products?.some(
    (item) => item.documentId === productId || item.stock === 0
  );

  console.log(products);

  const handleAddToCart = async () => {
    try {
      await addItemToCart(productId);
      setCart((prevCart) => ({
        ...prevCart,
        cart_items: [
          ...prevCart.cart_items,
          { product: { documentId: productId } },
        ],
      }));
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={cn(
        variant === "default" &&
          "w-full bg-amber-800 dark:bg-stone-500 dark:hover:bg-stone-400 text-base transition-all hover:bg-amber-700 active:bg-amber-600 active:scale-95 font-bold text-amber-50",
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
