"use client";

import { QuoteIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";
import { countBookmarkedQuotes } from "@/server/quotes/queries";
import { useGetBookmarksCount } from "@/data/get-bookmarks-count";

const Links = () => {
  const pathname = usePathname();

  const { data } = useGetBookmarksCount();

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
          href="/bookmarks"
          className={`transition-colors hover:text-foreground whitespace-nowrap ${
            pathname === "/bookmarks"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          Bookmarks
        </Link>
        <Badge className="m-1">{data}</Badge>
      </div>
    </>
  );
};

export default Links;
