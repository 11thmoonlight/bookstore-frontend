"use client";
import { createCheckout } from "@/data/services/createCheckout";
import CartTable from "@/components/CartTable";
import { useCartManager } from "@/hooks/useCartManager";
import CartSummary from "@/components/CartSummary";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";
import CheckoutForm from "@/components/CheckoutFprm";

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
    cartItemError,
  } = useCartManager();

  const onSubmit = async (values: CheckoutFormValues) => {
    try {
      createCheckout(Number(totalPrice));

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const { clientSecret } = await response.json();
      console.log("Stripe client secret:", clientSecret);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  if (loading || cartItemLoading || !quantities) return <Loader />;
  if (error || cartItemError) return <ErrorMessage />;

  return (
    <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col mb-6 justify-between items-start gap-16">
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        {cart && (
          <CartTable
            variant="readonly"
            cart={cart}
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

      <div className="w-full md:w-1/2 flex flex-col gap-4 bg-stone-50 p-9 rounded-lg shadow-lg">
        <p className="bg-stone-500 text-amber-50 p-2 rounded-sm font-bold mb-8 text-center">
          Shipping Information
        </p>
        <CheckoutForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
