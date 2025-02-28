import { useState, useEffect, useCallback } from "react";
import { getCartById, getOrCreateCart } from "@/data/services/cartServices";
import { toast } from "react-toastify";

export function useCart(cartId: string) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const result = await getCartById(cartId);
        if (result.ok) {
          setCart(result.data.data);
          setError(null);
        } else {
          setError(result.error?.message || "Failed to fetch cart.");
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to fetch cart.");
      } finally {
        setLoading(false);
      }
    };

    if (cartId) {
      fetchCart();
    }
  }, [cartId]);

  const createCart = useCallback(async (userId: number | undefined) => {
    setLoading(true);
    try {
      const result = await getOrCreateCart(userId);
      if (result.ok) {
        setCart(result.data);
        setError(null);
        toast.success("Cart is ready!");
      } else {
        setError(result.error?.message || "Failed to get/create cart.");
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error handling cart:", error);
      setError("Failed to get/create cart.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cart,
    setCart,
    loading,
    error,
    createCart,
  };
}
