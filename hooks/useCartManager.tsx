"use client";

import { useEffect, useState, useMemo } from "react";
import { useUser } from "@/context/userContext";
import { useCart } from "@/hooks/useCart";
import { useCartItem } from "@/hooks/useCartItem";

export function useCartManager() {
  const { user } = useUser();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const { cart, loading, error, setCart, removeFromCart } = useCart(
    user?.cart?.documentId || ""
  );
  const {
    loading: cartItemLoading,
    error: cartItemError,
    fetchCartItemByIds,
    updateQuantity,
    removeItemFromCart,
  } = useCartItem(user?.cart?.documentId || "");

  useEffect(() => {
    const fetchQuantities = async () => {
      if (user?.cart?.documentId && cart?.products?.length) {
        const quantityData: Record<string, number> = {};
        const promises = cart.products.map(async (item) => {
          const data = await fetchCartItemByIds(item.documentId);
          if (data) quantityData[item.documentId] = data.quantity;
        });

        await Promise.all(promises);
        setQuantities(quantityData);
      }
    };

    fetchQuantities();
  }, [cart?.products, user?.cart?.documentId]);

  const handleIncreaseItem = async (productId: string) => {
    if (!user?.cart?.documentId || !cart?.products?.length) return;

    try {
      const cartItemData = await fetchCartItemByIds(productId);
      const newQuantity = cartItemData.quantity + 1;
      const response = await updateQuantity(
        cartItemData.documentId,
        newQuantity
      );

      if (response) {
        setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
      }
    } catch (err) {
      console.error("Error increasing item quantity:", err);
    }
  };

  const handleDecreaseItem = async (productId: string) => {
    if (!user?.cart?.documentId) return;

    try {
      const cartItemData = await fetchCartItemByIds(productId);

      const { documentId: cartItemId, quantity } = cartItemData;

      if (quantity > 1) {
        const response = await updateQuantity(cartItemId, quantity - 1);

        if (response) {
          setQuantities((prev) => ({
            ...prev,
            [productId]: Math.max((prev[productId] || 0) - 1, 0),
          }));
        }
      } else {
        await removeFromCart(productId);
        await removeItemFromCart(cartItemId);

        setCart((prevItems) => {
          if (!prevItems || !prevItems.products) {
            return prevItems;
          }

          return {
            ...prevItems,
            products: prevItems.products.filter(
              (product) => product.documentId !== productId
            ),
          };
        });
      }
    } catch (err) {
      console.error("Error decreasing item quantity:", err);
    }
  };

  const totalItems = useMemo(() => {
    return (
      cart?.products?.reduce(
        (sum, product) => sum + (quantities[product.documentId] || 0),
        0
      ) || 0
    );
  }, [cart, quantities]);

  const discounts = useMemo(() => {
    return (
      cart?.products
        ?.reduce(
          (sum, product) =>
            sum + product.discount * (quantities[product.documentId] || 0),
          0
        )
        .toFixed(2) || "0.00"
    );
  }, [cart, quantities]);

  const totalPrice = useMemo(() => {
    return (
      cart?.products
        ?.reduce(
          (sum, product) =>
            sum + product.price * (quantities[product.documentId] || 0),
          0
        )
        .toFixed(2) || "0.00"
    );
  }, [cart, quantities]);

  return {
    cart,
    quantities,
    handleIncreaseItem,
    handleDecreaseItem,
    totalItems,
    totalPrice,
    discounts,
    loading,
    cartItemLoading,
    error,
    cartItemError,
  };
}
