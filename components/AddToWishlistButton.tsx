"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { useWishlist } from "@/hooks/useWishlist";

interface AddToWishlistButtonProps {
  productId: string;
}

export default function AddToWishlistButton({
  productId,
}: AddToWishlistButtonProps) {
  const { user } = useUser();
  const { addToWishList } = useWishlist(user?.wishlists[0].documentId || "");

  const handleAddToWishlist = async () => {
    try {
      await addToWishList(productId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      onClick={handleAddToWishlist}
      className="w-96 bg-amber-800 text-base hover:bg-amber-700 font-bold text-amber-50"
    >
      Add to wishlist
    </Button>
  );
}
