"use client";

import { useGetQuotes } from "@/data/get-quotes";
import { Button } from "../ui/button";
import QuoteCard from "./quote-card";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { QuoteWithBookMark } from "@/server/quotes/models";

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

  return (
    <div className="flex flex-col items-center w-full gap-8">
      {quotePages?.pages.map((page) =>
        page.data
          .filter(filterByBookmarks)
          .map((quote: QuoteWithBookMark) => (
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
          {fetchStatus === "fetching" ? "Loading..." : "Load more"}
        </Button>
      )}
    </div>
  );
};

export default QuoteList;
