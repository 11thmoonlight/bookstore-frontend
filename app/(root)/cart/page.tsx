"use client";

import { useCartManager } from "@/hooks/useCartManager";
import CartTable from "@/components/CartTable";
import CartSummary from "@/components/CartSummary";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";

export default function Cart() {
  const {
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
    products,
    cartItemError,
  } = useCartManager();

  if (loading || cartItemLoading || !quantities) return <Loader />;
  if (error || cartItemError) return <ErrorMessage />;
  if (cart?.cart_items.length === 0)
    return <ErrorMessage message="There are no books in  your cart !" />;

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col gap-8 mb-12 justify-center items-start">
      {cart && (
        <CartTable
          products={products}
          quantities={quantities}
          onAdd={handleIncreaseItem}
          onRemove={handleDecreaseItem}
        />
      )}
      <CartSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        discounts={discounts}
      />
    </div>
  );
}
