"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div>
      <div className="bg-amber-950 py-9 rounded-lg bg-opacity-85 sm:w-96 w-80">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col justify-between items-center"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-col items-center mb-4 text-amber-50">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-amber-50 bg-opacity-85 sm:w-72 w-64"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-col items-center mb-4 text-amber-50">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-amber-50 bg-opacity-85 sm:w-72 w-64"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-col items-center mb-4 text-amber-50">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="bg-amber-50 bg-opacity-85 sm:w-72 w-64"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="hover:bg-amber-50 text-amber-950 font-bold bg-amber-100 text-center"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex flex-col justify-normal items-center mt-10 bg-opacity-85 bg-amber-950 text-amber-50 rounded-lg p-4">
        <span>
          Already have an account?{" "}
          <Link
            href="/log-in"
            className="text-amber-300 font-bold hover:text-amber-500"
          >
            Log In
          </Link>
        </span>
      </div>
    </div>
  );
}
