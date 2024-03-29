"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { logout } from "@/server/auth/auth";
import { type User } from "@supabase/supabase-js";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useForm } from "react-hook-form";

export type AuthHandlerButtonProps = {
  user: User | null;
};

export const AuthHandlerButton = (props: AuthHandlerButtonProps) => {
  const { user } = props;
  const { toast } = useToast();
  const { handleSubmit } = useForm();

  const { execute, status } = useAction(logout, {
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.serverError}`,
      });
    },
  });

  const onSubmit = handleSubmit(async () => {
    execute({});
  });

  return (
    <>
      {user ? (
        <form onSubmit={onSubmit}>
          <Button
            variant={"outline"}
            formAction={logout}
            disabled={status === "executing"}
          >
            Log out
          </Button>
        </form>
      ) : (
        <>
          <Button>
            <Link href="/login">Log in</Link>
          </Button>
        </>
      )}
    </>
  );
};
