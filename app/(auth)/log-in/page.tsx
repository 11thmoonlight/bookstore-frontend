"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { loginUserAction } from "@/data/actions/auth-actions";

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
  data: null,
  message: null,
};

export default function LogIn() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
  const { setUser } = useUser();

  useEffect(() => {
    if (formState?.data) {
      setUser(formState?.data);
      redirect("/");
    }
  }, [formState?.data]);

  return (
    <div className="w-fit sm:w-full max-w-md">
      <form action={formAction}>
        <Card className="bg-amber-950 rounded-lg bg-opacity-85 border-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-amber-100">
              Sign In
            </CardTitle>
            <CardDescription className="text-amber-200">
              Enter your credentials to sign in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-amber-50" htmlFor="identifier">
                Username
              </Label>
              <Input
                className="text-amber-100"
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username"
              />
              <ZodErrors error={formState?.zodErrors?.identifier || []} />
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
              <ZodErrors error={formState.zodErrors?.password || []} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton
              className="w-full hover:bg-amber-200 font-bold bg-amber-100 text-amber-950 active:scale-9"
              text="Sign In"
              loadingText="Loading"
            />
            {formState?.message && (
              <p className="text-red-500 text-sm mt-2">{formState.message}</p>
            )}
            <StrapiErrors error={formState?.strapiErrors} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm bg-opacity-85 bg-amber-950 text-amber-50 rounded-lg p-4">
          Do not have an account?
          <Link className="underline ml-2" href="register">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
