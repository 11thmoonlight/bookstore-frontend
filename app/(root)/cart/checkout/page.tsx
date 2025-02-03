"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCheckout } from "@/data/services/createCheckout";
import CartTable from "@/components/CartTable";
import { useCartManager } from "@/hooks/useCartManager";
import CartSummary from "@/components/CartSummary";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";

const formSchema = z.object({
  address: z
    .string()
    .min(10, {
      message: "Address must be at least 10 characters.",
    })
    .max(100, {
      message: "Address must be less than 100 characters.",
    }),
  phoneNumber: z.string(),
  postalCode: z.string(),
  emailAddress: z.string(),
});

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      phoneNumber: undefined,
      postalCode: undefined,
      emailAddress: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

  if (loading || cartItemLoading) return <Loader />;
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

      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <p className="bg-amber-800 text-amber-50 p-2 rounded-sm font-bold mb-8">
          Yout Information
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="city/street/house" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="09334040400" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="371213141" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="email@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
