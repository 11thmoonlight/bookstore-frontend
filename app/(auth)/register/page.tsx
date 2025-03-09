"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { registerUserAction } from "@/data/actions/auth-actions";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ZodErrors } from "@/components/custom/ZodErrors";
import { StrapiErrors } from "@/components/custom/StrapiErrors";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { useEffect } from "react";
import { useUser } from "@/context/userContext";
import { redirect } from "next/navigation";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  message: "",
  data: null,
};

export default function Register() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );
  const { setUser } = useUser();

  useEffect(() => {
    if (formState?.data) {
      setUser(formState?.data);
      redirect("/");
    }
  }, [formState?.data, setUser]);

  return (
    <div className="w-fit sm:w-full max-w-md">
      <form action={formAction}>
        <Card className="bg-amber-950 rounded-lg bg-opacity-85 border-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-amber-100">
              Sign Up
            </CardTitle>
            <CardDescription className="text-amber-200">
              Enter your credentials to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-amber-50" htmlFor="username">
                Username
              </Label>
              <Input
                className="text-amber-100"
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
              <ZodErrors error={formState?.zodErrors?.username ?? []} />
            </div>
            <div className="space-y-2">
              <Label className="text-amber-50" htmlFor="email">
                Email
              </Label>
              <Input
                className="text-amber-100"
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <ZodErrors error={formState?.zodErrors?.email ?? []} />
            </div>

            <div className="space-y-2">
              <Label className="text-amber-50" htmlFor="password">
                Password
              </Label>
              <Input
                className="text-amber-100"
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <ZodErrors error={formState?.zodErrors?.password ?? []} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton
              className="w-full hover:bg-amber-200 font-bold bg-amber-100 text-amber-950 active:scale-9"
              text="Sign Up"
              loadingText="Loading"
            />
            <StrapiErrors
              error={
                formState?.strapiErrors
                  ? {
                      message: formState.strapiErrors,
                      name: "Error",
                      status: null,
                    }
                  : { message: null, name: "Error", status: null }
              }
            />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm bg-opacity-85 bg-amber-950 text-amber-50 rounded-lg p-4">
          Have an account?
          <Link className="underline ml-2" href="log-in">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
