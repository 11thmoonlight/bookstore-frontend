"use client";

import { useEffect, useState, useMemo } from "react";
import { useUser } from "@/context/userContext";
import { useCart } from "@/hooks/useCart";
import { useCartItem } from "@/hooks/useCartItem";

export function useCartManager() {
  const { user } = useUser();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const { cart, loading, error, setCart } = useCart(
    user?.cart?.documentId || ""
  );
  const {
    loading: cartItemLoading,
    error: cartItemError,
    updateQuantity,
    removeItemFromCart,
  } = useCartItem(user?.cart?.documentId || "");

  useEffect(() => {
    if (!cart?.cart_items?.length) return;

    const quantityData: Record<string, number> = {};

    cart.cart_items.forEach((item) => {
      quantityData[item.product.documentId] = item.quantity;
    });

    setQuantities(quantityData);
  }, [cart?.cart_items]);

  const handleIncreaseItem = async (productId: string) => {
    if (!user?.cart?.documentId) return;

    try {
      const cartItem = cart?.cart_items.find(
        (item) => item.product.documentId === productId
      );

      if (!cartItem) return;

      const newQuantity = cartItem.quantity + 1;
      const response = await updateQuantity(cartItem.documentId, newQuantity);

      if (response) {
        setCart((prevCart) => {
          if (!prevCart) return prevCart;

          return {
            ...prevCart,
            cart_items: prevCart.cart_items.map((item) =>
              item.documentId === cartItem.documentId
                ? { ...item, quantity: newQuantity }
                : item
            ),
          };
        });
      }
    } catch (err) {
      console.error("Error increasing item quantity:", err);
    }
  };

  const handleDecreaseItem = async (productId: string) => {
    if (!user?.cart?.documentId) return;

    try {
      const cartItem = cart?.cart_items.find(
        (item) => item.product.documentId === productId
      );

      if (!cartItem) return;

      if (cartItem.quantity > 1) {
        const newQuantity = cartItem.quantity - 1;
        const response = await updateQuantity(cartItem.documentId, newQuantity);

        if (response) {
          setCart((prevCart) => {
            if (!prevCart) return prevCart;

            return {
              ...prevCart,
              cart_items: prevCart.cart_items.map((item) =>
                item.documentId === cartItem.documentId
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            };
          });
        }
      } else {
        const response = await removeItemFromCart(cartItem.documentId);
        if (response) {
          setCart((prevCart) => {
            if (!prevCart) return prevCart;

            return {
              ...prevCart,
              cart_items: prevCart.cart_items.filter(
                (item) => item.documentId !== cartItem.documentId
              ),
            };
          });
        }
      }
    } catch (err) {
      console.error("Error decreasing item quantity:", err);
    }
  };

  const totalItems = useMemo(() => {
    return cart?.cart_items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  }, [cart]);

  const discounts = useMemo(() => {
    return (
      cart?.cart_items
        ?.reduce(
          (sum, item) =>
            sum + (item.product ? item.product.discount * item.quantity : 0),
          0
        )
        .toFixed(2) || "0.00"
    );
  }, [cart]);

  const totalPrice = useMemo(() => {
    return (
      cart?.cart_items
        ?.reduce(
          (sum, item) =>
            sum + (item.product ? item.product.price * item.quantity : 0),
          0
        )
        .toFixed(2) || "0.00"
    );
  }, [cart]);

  const products = useMemo(() => {
    return cart?.cart_items?.map((item) => item.product) || [];
  }, [cart]);

  return {
    cart,
    setCart,
    quantities,
    handleIncreaseItem,
    handleDecreaseItem,
    totalItems,
    totalPrice,
    discounts,
    products,
    loading,
    cartItemLoading,
    error,
    cartItemError,
  };
}
