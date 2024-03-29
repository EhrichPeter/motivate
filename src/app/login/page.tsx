"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginWithOtp } from "@/server/auth/auth";
import { ChevronLeft, QuoteIcon } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithOtpFormSchema } from "@/server/auth/models";

type loginFormType = z.infer<typeof loginWithOtpFormSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginFormType>({
    resolver: zodResolver(loginWithOtpFormSchema),
  });
  const { toast } = useToast();

  const { execute, status } = useAction(loginWithOtp, {
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Magic link sent!",
        description: "Check your email inbox to log in.",
      });
      reset();
    },
    onError: (error) => {
      if (error.validationErrors) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please check your email and try again.",
        });
      } else if (error.serverError) {
        console.log(error.serverError);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.serverError}`,
        });
      }
    },
  });

  const onSubmit = handleSubmit(async (data: loginFormType) => {
    execute(data);
  });

  return (
    <main className="flex min-h-screen items-center container">
      <div className="fixed left-5 top-5">
        <div className="flex items-center">
          <Link href="/">
            <Button variant={"ghost"} className="gap-3">
              <ChevronLeft size={20} />
              <p>Back</p>
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col mx-auto w-full sm:w-96 gap-6">
        <div className="flex flex-col items-center gap-2">
          <QuoteIcon size={20} />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 text-sm">
            Enter your email to sign in to your account
          </p>
        </div>
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <Input
            {...register("email")}
            placeholder="Email"
            className={`${errors.email ? "border-red-500" : ""}`}
          />
          <Button type="submit" disabled={status === "executing"}>
            Sign In with Email
          </Button>
        </form>
      </div>
    </main>
  );
}
