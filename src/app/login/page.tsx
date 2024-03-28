import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginWithGithub, loginWithOtp } from "@/server/auth";
import { ChevronLeft, QuoteIcon } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function Login() {
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
        <form className="flex flex-col gap-2">
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
          />
          <Button formAction={loginWithOtp}>Sign In with Email</Button>
        </form>
        {/* <div className="flex items-center justify-between">
          <Separator className="w-1/4" />
          <p className="mx-2 text-sm text-gray-500 whitespace-nowrap">
            OR CONTINUE WITH
          </p>
          <Separator className="w-1/4" />
        </div>
        <form className="flex flex-col gap-2">
          <Button variant={"outline"}>
            <FaGoogle />
          </Button>
          <Button variant={"outline"} formAction={loginWithGithub}>
            <FaGithub />
          </Button>
        </form> */}
      </div>
    </main>
  );
}
