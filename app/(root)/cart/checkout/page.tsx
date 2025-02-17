"use client";
// import { createCheckout } from "@/data/services/createCheckout";
// import CartTable from "@/components/CartTable";
// import { useCartManager } from "@/hooks/useCartManager";
// import CartSummary from "@/components/CartSummary";
// import Loader from "@/components/custom/Loader";
// import ErrorMessage from "@/components/custom/ErrorMessage";
// import CheckoutForm from "@/components/CheckoutForm";
// import { useState } from "react";

// export default function Checkout() {
//   const {
//     cart,
//     quantities,
//     handleIncreaseItem,
//     handleDecreaseItem,
//     totalItems,
//     totalPrice,
//     discounts,
//     loading,
//     cartItemLoading,
//     error,
//     cartItemError,
//   } = useCartManager();

//   const [isSubmiting, setIsSubmiting] = useState(false);

//   const onSubmit = async (values: CheckoutFormValues) => {
//     try {
//       createCheckout(Number(totalPrice));
//       const response = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });
//       const { clientSecret } = await response.json();
//       console.log("Stripe client secret:", clientSecret);
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//     }
//   };

//   if (loading || cartItemLoading || !quantities) return <Loader />;
//   if (error || cartItemError) return <ErrorMessage />;

//   return (
//     <div className="mt-[160px] lg:px-20 px-2 md:flex md:flex-row flex flex-col mb-6 justify-between items-start gap-16">
//       <div className="flex flex-col gap-4 w-full md:w-1/2">
//         {cart && (
//           <CartTable
//             variant="readonly"
//             cart={cart}
//             quantities={quantities}
//             onAdd={handleIncreaseItem}
//             onRemove={handleDecreaseItem}
//           />
//         )}

//         <CartSummary
//           variant="readonly"
//           totalItems={totalItems}
//           totalPrice={totalPrice}
//           discounts={discounts}
//         />
//       </div>

//       <div className="w-full md:w-1/2 flex flex-col gap-4 bg-stone-50 p-9 rounded-lg shadow-lg">
//         <p className="bg-stone-500 text-amber-50 p-2 rounded-sm font-bold mb-8 text-center">
//           Shipping Information
//         </p>
//         <CheckoutForm onSubmit={onSubmit} isSubmiting={isSubmiting} />
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCartManager } from "@/hooks/useCartManager";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Checkout() {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    emailAddress: "",
    phoneNumber: "",
    postalCode: "",
  });

  const { totalPrice, cart } = useCartManager();

  useEffect(() => {
    const savedShippingInfo = localStorage.getItem("shippingInfo");
    if (savedShippingInfo) {
      setShippingInfo(JSON.parse(savedShippingInfo));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShippingInfo = {
      ...shippingInfo,
      [e.target.name]: e.target.value,
    };
    setShippingInfo(newShippingInfo);
    localStorage.setItem("shippingInfo", JSON.stringify(newShippingInfo));
  };

  const handleSubmit = async () => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const res = await fetch("http://localhost:1337/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalPrice, shippingInfo }),
    });

    const { sessionId } = await res.json();
    const stripe = await stripePromise;

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) console.error("Stripe Error:", error);
    }
  };

  return (
    <div className="mt-[160px]">
      <h2>اطلاعات ارسال</h2>
      <input
        name="name"
        placeholder="نام"
        value={shippingInfo.name}
        onChange={handleInputChange}
      />
      <input
        name="address"
        placeholder="آدرس"
        value={shippingInfo.address}
        onChange={handleInputChange}
      />
      <input
        name="city"
        placeholder="شهر"
        value={shippingInfo.city}
        onChange={handleInputChange}
      />
      <input
        name="emailAddress"
        placeholder="email"
        value={shippingInfo.emailAddress}
        onChange={handleInputChange}
      />
      <input
        name="phoneNumber"
        placeholder="شماره تلفن"
        value={shippingInfo.phoneNumber}
        onChange={handleInputChange}
      />
      <input
        name="postalCode"
        placeholder="کد پستی"
        value={shippingInfo.postalCode}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>پرداخت</button>
    </div>
  );
}
