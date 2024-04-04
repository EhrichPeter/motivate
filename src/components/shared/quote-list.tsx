"use client";

import { useGetQuotes } from "@/data/get-quotes";
import { Button } from "../ui/button";
import QuoteCard from "./quote-card";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { QuoteWithBookMark } from "@/server/quotes/models";
import { LoaderIcon } from "lucide-react";
import NoQuotes from "../bookmarks/no-quotes";

const QuoteList = (props: { filterBookmarks: boolean }) => {
  const {
    data: quotePages,
    fetchNextPage,
    fetchStatus,
    hasNextPage,
  } = useGetQuotes();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const filterByBookmarks = (quote: QuoteWithBookMark) => {
    return props.filterBookmarks ? quote.bookmarked : true;
  };

  const filtered = quotePages?.pages.map((page) =>
    page.data.filter(filterByBookmarks)
  );

  if (!filtered || filtered[0].length === 0) {
    return <NoQuotes />;
  }

  return (
    <div className="flex flex-col items-center w-full gap-8">
      {filtered.map((page) =>
        page.map((quote: QuoteWithBookMark) => (
          <QuoteCard key={quote.id} {...quote} />
        ))
      )}

      {hasNextPage && (
        <Button
          variant={"outline"}
          className={"rounded-full"}
          onClick={() => fetchNextPage()}
          disabled={fetchStatus === "fetching"}
          ref={ref}
        >
          {fetchStatus === "fetching" ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            "Load more"
          )}
        </Button>
      )}
    </div>
  );
};

export default QuoteList;
