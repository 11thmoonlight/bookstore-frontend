import { useState, useEffect, useCallback } from "react";
import {
  getwishlistById,
  addItemTowishlist,
  removeItemFromwishlist,
} from "@/app/api/wishlist/wishlistServices";

export function useWishlist(wishlistId: string) {
  const [wishlist, setWishlist] = useState<WhishListItems | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart data
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const result = await getwishlistById(wishlistId);
        if (result.ok) {
          setWishlist(result.data.data);
          setError(null);
        } else {
          setError(result.error?.message || "Failed to fetch cart.");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to fetch cart.");
      } finally {
        setLoading(false);
      }
    };

    if (wishlistId) {
      fetchWishlist();
    }
  }, [wishlistId]);

  // Add product to cart
  const addToWishList = useCallback(
    async (itemId: string) => {
      setLoading(true);
      try {
        const result = await addItemTowishlist(wishlistId, itemId);
        if (result.ok) {
          setWishlist(result.data);
          setError(null);
        } else {
          setError(result.error?.message || "Failed to add item.");
        }
      } catch (error) {
        console.error("Error adding item:", error);
        setError("Failed to add item.");
      } finally {
        setLoading(false);
      }
    },
    [wishlistId]
  );

  // Remove product from cart
  const removeFromWishlist = useCallback(
    async (itemId: string) => {
      setLoading(true);
      try {
        const result = await removeItemFromwishlist(wishlistId, itemId);
        if (result.ok) {
          setWishlist(result.data);
          setError(null);
        } else {
          setError(result.error?.message || "Failed to remove item.");
        }
      } catch (error) {
        console.error("Error removing item:", error);
        setError("Failed to remove item.");
      } finally {
        setLoading(false);
      }
    },
    [wishlistId]
  );

  return {
    wishlist,
    setWishlist,
    loading,
    error,
    addToWishList,
    removeFromWishlist,
  };
}
