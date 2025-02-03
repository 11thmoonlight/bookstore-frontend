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
    cartItemError,
  } = useCartManager();

  if (loading || cartItemLoading) return <Loader />;
  if (error || cartItemError) return <ErrorMessage />;

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col gap-4 mb-6 justify-center items-start">
      {cart && (
        <div className="md:h-[370px] overflow-y-auto w-full scrollbar-thin">
          <CartTable
            cart={cart}
            quantities={quantities}
            onAdd={handleIncreaseItem}
            onRemove={handleDecreaseItem}
          />
        </div>
      )}
      <CartSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        discounts={discounts}
      />
    </div>
  );
}
