"use client";

import { logout } from "@/server/auth/actions";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { CircleUser } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";

export type UserDropdownProps = {
  email: string | undefined;
};

export const UserDropdown = (props: UserDropdownProps) => {
  const { email } = props;

  const handleLogout = async () => {
    try {
      await logout();
      toast("Logout successful!", {
        description: "You have been logged out.",
      });
    } catch (error: any) {
      toast("Something went wrong!", {
        description: error,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            <AvatarFallback>
              {email ? email.substring(0, 2).toUpperCase() : <CircleUser />}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
