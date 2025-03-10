"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { useCartItem } from "@/hooks/useCartItem";
import { useCartManager } from "@/hooks/useCartManager";
import { cn } from "@/lib/utils";
import { PiShoppingCartLight } from "react-icons/pi";

interface AddToCartButtonProps {
  productId: string;
  variant?: "default" | "icon" | "wishlist";
  stock: number;
}

export default function AddToCartButton({
  productId,
  variant = "default",
  stock,
}: AddToCartButtonProps) {
  const { user } = useUser();
  const { addItemToCart } = useCartItem(user?.cart?.documentId || "");
  const { products, setCart } = useCartManager();

  const isDisabled =
    products?.some((item) => item.documentId === productId) || stock === 0;

  const handleAddToCart = async () => {
    try {
      await addItemToCart(productId);
      setCart((prevCart) => {
        const updatedCart: Cart = prevCart ?? {
          createdAt: "",
          documentId: "",
          id: 0,
          locale: null,
          publishedAt: null,
          updatedAt: "",
          cart_items: [],
        };

        return {
          ...updatedCart,
          cart_items: [
            ...updatedCart.cart_items,
            {
              product: { documentId: productId },
              createdAt: new Date().toISOString(),
              documentId: "",
              id: Date.now(),
              locale: null,
              publishedAt: null,
              updatedAt: new Date().toISOString(),
            } as CartItem,
          ],
        };
      });
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
          "bg-stone-200 text-amber-800 hover:shadow-lg hover:bg-white active:scale-95 transition-all active:bg-stone-200",
        variant === "wishlist" &&
          "bg-lime-200 hover:bg-lime-300 text-lime-900 active:scale-95 transition-all active:bg-lime-200"
      )}
    >
      {variant === "icon" ? <PiShoppingCartLight size={27} /> : "Add to cart"}
    </Button>
  );
}
