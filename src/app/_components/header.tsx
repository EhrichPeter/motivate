import React from "react";
import Link from "next/link";
import { QuoteIcon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/ui/mode-toggle";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-10 h-12 border-b">
      <div className="flex container h-full items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/">
            <div className="flex items-center gap-2">
              <QuoteIcon size={24} />
              <h1 className="text-lg font-bold">quote</h1>
            </div>
          </Link>

          {/* <h1 className="text-sm">Daily Quote</h1> */}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/EhrichPeter/quote"
            target="_blank"
          >
            <GitHubLogoIcon height={24} width={24} />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
