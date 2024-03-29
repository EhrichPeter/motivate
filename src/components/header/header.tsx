import Link from "next/link";
import { CircleUser, Menu, QuoteIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "./logout-button";
import { ModeToggle } from "../ui/mode-toggle";
import { LoginButton } from "./login-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Links from "./links";

export async function Header() {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4  border-b bg-background px-4 md:px-6 justify-between z-10">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Links />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Links />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex gap-4">
        <ModeToggle />
        {user ? (
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    <AvatarFallback>
                      {user.email?.substring(0, 2).toUpperCase() ?? (
                        <AvatarImage />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
