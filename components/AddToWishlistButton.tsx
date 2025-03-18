"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { GoHeart } from "react-icons/go";

interface AddToWishlistButtonProps {
  productId: string;
  variant?: "default" | "icon";
}

export default function AddToWishlistButton({
  productId,
  variant = "default",
}: AddToWishlistButtonProps) {
  const { user } = useUser();
  const { addToWishList, wishlist } = useWishlist(
    user?.wishlists[0]?.documentId || ""
  );

  const isInWishlist = wishlist?.products?.some(
    (item) => item.documentId === productId
  );

  const handleAddToWishlist = async () => {
    if (isInWishlist) return;
    try {
      await addToWishList(productId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      onClick={handleAddToWishlist}
      disabled={isInWishlist}
      className={cn(
        variant === "default" &&
          "w-full bg-amber-800 dark:bg-stone-500 dark:hover:bg-stone-400 text-base transition-all hover:bg-amber-700 active:bg-amber-600 active:scale-95 font-bold text-amber-50",
        variant === "icon" &&
          "bg-stone-200 text-amber-800 hover:shadow-lg hover:bg-white active:scale-95 transition-all active:bg-stone-200"
      )}
    >
      {variant === "default" ? "Add to wish list" : <GoHeart size={27} />}
    </Button>
  );
}
