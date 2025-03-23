import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { useCartManager } from "@/hooks/useCartManager";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";

const formSchema = z.object({
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters." })
    .max(100, { message: "Address must be less than 100 characters." }),
  phoneNumber: z.string(),
  postalCode: z.string(),
  emailAddress: z.string().email({ message: "Invalid email address" }),
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface CheckoutFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

export default function CheckoutForm({
  isSubmitting,
  setIsSubmitting,
}: CheckoutFormProps) {
  const { totalPrice, cart } = useCartManager();
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    phoneNumber: "",
    postalCode: "",
    emailAddress: "",
  });

  useEffect(() => {
    const savedShippingInfo = localStorage.getItem("shippingInfo");
    if (savedShippingInfo) {
      setShippingInfo(JSON.parse(savedShippingInfo));
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: shippingInfo,
  });

  const handleInputChange = (field: string, value: string) => {
    const newShippingInfo = { ...shippingInfo, [field]: value };
    setShippingInfo(newShippingInfo);
    localStorage.setItem("shippingInfo", JSON.stringify(newShippingInfo));
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    localStorage.setItem("shippingInfo", JSON.stringify(values));
    localStorage.setItem("cart", JSON.stringify(cart));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ totalPrice, shippingInfo: values }),
        }
      );

      const { sessionId } = await res.json();
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) console.error("Stripe Error:", error);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 text-center flex flex-col gap-1"
      >
        {["address", "phoneNumber", "postalCode", "emailAddress"].map(
          (field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as keyof z.infer<typeof formSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input
                      className="text-center"
                      placeholder={
                        field.name === "emailAddress" ? "email@gmail.com" : ""
                      }
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(field.name, e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}

        <Button
          className="bg-amber-600 hover:bg-amber-700 font-semibold text-amber-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              Processing
              <ClipLoader size={18} color="#ffffff" />
            </>
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </form>
    </Form>
  );
}
