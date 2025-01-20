import { useState } from "react";
import {
  getCartItemById,
  getCartItemByIds,
  updateCartItemQuantity,
  addCartItem,
  removeCartItem,
} from "@/app/api/cartItem/cartItemService";

export function useCartItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCartItemById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCartItemById(id);
      setLoading(false);
      if (result.ok) {
        return result.data;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      return null;
    }
  };

  const fetchCartItemByIds = async (cartId: string, productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCartItemByIds(cartId, productId);
      setLoading(false);
      if (result.ok) {
        return result.data;
      } else {
        setError(new Error(result.error as string));
        return null;
      }
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      return null;
    }
  };

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateCartItemQuantity(cartItemId, newQuantity);
      setLoading(false);
      if (result.ok) {
        return result.data;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      return null;
    }
  };

  const addItemToCart = async (
    cartId: string,
    productId: string,
    quantity = 1
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addCartItem(cartId, productId, quantity);
      setLoading(false);
      if (result.ok) {
        return result.data;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      return null;
    }
  };

  const removeItemFromCart = async (cartItemId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await removeCartItem(cartItemId);
      setLoading(false);
      if (result.ok) {
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      return false;
    }
  };

  return {
    loading,
    error,
    fetchCartItemById,
    fetchCartItemByIds,
    updateQuantity,
    addItemToCart,
    removeItemFromCart,
  };
}
