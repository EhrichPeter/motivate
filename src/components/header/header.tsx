import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Quote } from "@/server/quotes/models";
import { findManyforUserWithBookMarks } from "@/server/quotes/queries";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import Links from "./links";
import { UserDropdown } from "./user-dropdown";

export async function Header() {
  const supabase = createClient();
  let quotes: Quote[] = [];
  const { user } = (await supabase.auth.getUser()).data;

  if (user) {
    quotes = (await findManyforUserWithBookMarks(user.id)) || [];
  }

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4  border-b bg-background px-4 md:px-6 justify-between z-10">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Links number_of_bookmarks={quotes.length} />
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
            <Links number_of_bookmarks={quotes.length} />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex gap-4">
        <ModeToggle />
        {user ? (
          <UserDropdown email={user.email} />
        ) : (
          <Button>
            <Link href="/login">Log in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
