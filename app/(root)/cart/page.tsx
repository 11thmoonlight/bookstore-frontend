"use client";

import React, { useEffect, useState } from "react";

import { useUser } from "@/context/userContext";
import { useCartItem } from "@/hooks/useCartItem";
import { useCart } from "@/hooks/useCart";
import CartTable from "@/components/CartTable";
import CartSummary from "@/components/CartSummary";

export default function Cart() {
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
  } = useCartItem(user?.cart.documentId || "");

  useEffect(() => {
    const fetchQuantities = async () => {
      if (user?.cart?.documentId && cart?.products?.length) {
        const quantityData: Record<string, number> = {};
        const promises = cart.products.map(async (item) => {
          const data = await fetchCartItemByIds(item.documentId);
          if (data) {
            quantityData[item.documentId] = data.quantity;
          }
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
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [productId]: newQuantity,
        }));
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
          setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
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

  const discounts = cart?.products?.length
    ? cart.products
        .reduce((sum, product) => {
          const quantity = quantities[product.documentId] || 0;
          return sum + product.discount * quantity;
        }, 0)
        .toFixed(2)
    : "0.00";

  const totalPrice = cart?.products?.length
    ? cart.products
        .reduce((sum, product) => {
          const quantity = quantities[product.documentId] || 0;
          return sum + product.price * quantity;
        }, 0)
        .toFixed(2)
    : "0.00";

  const totalItems = cart?.products?.length
    ? cart.products.reduce((sum, product) => {
        const quantity = quantities[product.documentId] || 0;
        return sum + quantity;
      }, 0)
    : 0;

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col gap-4 mb-6 justify-center items-start">
      <CartTable
        cart={cart}
        quantities={quantities}
        onAdd={handleIncreaseItem}
        onRemove={handleDecreaseItem}
      />
      <CartSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        discounts={discounts}
      />
    </div>
  );
}
