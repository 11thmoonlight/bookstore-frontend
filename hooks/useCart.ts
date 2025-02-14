import { useState, useEffect, useCallback } from "react";
import {
  getCartById,
  addItemToCart,
  removeItemFromCart,
} from "@/data/services/cartServices";
import { toast } from "react-toastify";

export function useCart(cartId: string) {
  const [cart, setCart] = useState<CartItems | null>(null);
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
          toast.error('Something went wrong')
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

  // Add product to cart
  const addToCart = useCallback(
    async (itemId: string) => {
      setLoading(true);
      try {
        const result = await addItemToCart(cartId, itemId);
        if (result.ok) {
          setCart(result.data);
          setError(null);
          toast.success('Successfully added to your cart')
        } else {
          setError(result.error?.message || "Failed to add item.");
          toast.error('Something went wrong')
        }
      } catch (error) {
        console.error("Error adding item:", error);
        setError("Failed to add item.");
      } finally {
        setLoading(false);
      }
    },
    [cartId]
  );

  // Remove product from cart
  const removeFromCart = useCallback(
    async (itemId: string) => {
      setLoading(true);
      try {
        const result = await removeItemFromCart(cartId, itemId);
        if (result.ok) {
          setCart((prevCart) => {
            if (!prevCart) return null;
  
            return {
              ...prevCart,
              products: prevCart.products.filter(
                (product) => product.documentId !== itemId
              ),
            };
          });
          setError(null);
        } else {
          setError(result.error?.message || "Failed to remove item.");
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error removing item:", error);
        setError("Failed to remove item.");
      } finally {
        setLoading(false);
      }
    },
    [cartId]
  );

  return {
    cart,
    setCart,
    loading,
    error,
    addToCart,
    removeFromCart,
  };
}
