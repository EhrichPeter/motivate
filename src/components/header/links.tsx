"use client";

import { QuoteIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";

const Links = (props: { number_of_bookmarks: number }) => {
  const pathname = usePathname();
  const { number_of_bookmarks } = props;

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
        className={`transition-colors hover:text-foreground whitespace-nowrap ${pathname === "/" ? "text-foreground" : "text-muted-foreground"
          }`}
      >
        Daily Quote
      </Link>
      <div className="flex gap-1 items-center">
        <Link
          href="/bookmarks"
          className={`transition-colors hover:text-foreground whitespace-nowrap ${pathname === "/bookmarks"
            ? "text-foreground"
            : "text-muted-foreground"
            }`}
        >
          Bookmarks
        </Link>
        <Badge className="m-1">{number_of_bookmarks}</Badge>
      </div>
    </>
  );
};

export default Links;
