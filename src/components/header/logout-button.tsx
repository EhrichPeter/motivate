"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { logout } from "@/server/auth/auth";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

export const LogoutButton = () => {
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
    <form onSubmit={onSubmit} className="w-full">
      <Button
        variant={"destructive"}
        formAction={logout}
        disabled={status === "executing"}
        className="w-full"
      >
        Log out
      </Button>
    </form>
  );
};
