import React from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Logo from "./content/logo";
import { AuthHandlerButton } from "./auth_handler_button";
import { createClient } from "@/utils/supabase/server";

const Header = async () => {
  const supabase = createClient();

  const { user } = (await supabase.auth.getUser()).data;

  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-background bg-opacity-70 backdrop-blur-sm">
      <div className="flex container items-center justify-between py-2">
        <Logo />
        <div className="flex items-center gap-3">
          <ModeToggle />
          <AuthHandlerButton user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
