"use client";

import CartTable from "@/components/CartTable";
import { useCartManager } from "@/hooks/useCartManager";
import CartSummary from "@/components/CartSummary";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";
import CheckoutForm from "@/components/CheckoutForm";
import { useState } from "react";

export default function Checkout() {
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

  const [isSubmiting, setIsSubmiting] = useState(false);

  if (loading || cartItemLoading || !quantities) return <Loader />;
  if (error || cartItemError) return <ErrorMessage />;

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col mb-6 justify-between items-start gap-16">
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        {cart && (
          <CartTable
            variant="readonly"
            products={products}
            quantities={quantities}
            onAdd={handleIncreaseItem}
            onRemove={handleDecreaseItem}
          />
        )}

        <CartSummary
          variant="readonly"
          totalItems={totalItems}
          totalPrice={totalPrice}
          discounts={discounts}
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-4 bg-stone-50 dark:bg-stone-700 p-9 rounded-lg shadow-lg">
        <p className="bg-stone-500 text-amber-50 p-2 rounded-sm font-bold mb-8 text-center">
          Shipping Information
        </p>
        <CheckoutForm
          setIsSubmitting={setIsSubmiting}
          isSubmitting={isSubmiting}
        />
      </div>
    </div>
  );
}
