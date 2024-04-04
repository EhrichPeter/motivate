"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginWithOtp } from "@/server/auth/actions";
import { loginWithOtpFormSchema } from "@/server/auth/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, LoaderIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

  const { execute, status } = useAction(loginWithOtp, {
    onSuccess: () => {
      toast("Magic link sent!", {
        description: "Check your email to login.",
      });
      reset();
    },
    onError: (error) => {
      if (error.validationErrors) {
        toast("Something went wrong!", {
          description: "Please check your email and try again.",
        });
      } else if (error.serverError) {
        console.log(error.serverError);
        toast("Something went wrong!", {
          description: error.serverError,
        });
      }
    },
  });

  const onSubmit = handleSubmit(async (data: loginFormType) => {
    execute(data);
  });

  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2 flex justify-center">
      <div className="fixed top-5 left-5">
        <Link href="/">
          <Button variant={"ghost"}>
            <ChevronLeftIcon className="h-6 w-6" />
            <p>Back</p>
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-center container">
        <div className="mx-auto grid sm:w-[350px] w-full gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login or signup to your account
            </p>
          </div>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="m@example.com"
                {...register("email")}
                className={`${errors.email ? "border-red-500" : ""}`}
              />
            </div>
            <Button
              type="submit"
              disabled={status === "executing"}
              className="w-full"
            >
              {status === "executing" ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {/* <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  );
}
