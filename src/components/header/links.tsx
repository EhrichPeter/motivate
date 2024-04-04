"use client";

import { QuoteIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = () => {
  const pathname = usePathname();
  return (
    <>
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <QuoteIcon className="h-6 w-6" />
        <span className="sr-only">Quote</span>
      </Link>
      <Link
        href="/"
        className={`transition-colors hover:text-foreground whitespace-nowrap ${
          pathname === "/" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Daily Quote
      </Link>
      <div className="flex gap-1 items-center">
        <Link
          href="/library"
          className={`transition-colors hover:text-foreground whitespace-nowrap ${
            pathname === "/library"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          Library
        </Link>
      </div>
    </>
  );
};

export default Links;
