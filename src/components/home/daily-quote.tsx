"use client";

import { useGetQuotes } from "@/data/get-quotes";
import QuoteCard from "../shared/quote-card";

const DailyQuote = () => {
  const { data: quotePages } = useGetQuotes();

  const quote = quotePages!.pages[0].data[0];

  return (
    <div className="flex flex-col items-center w-full gap-8">
      <div className="grid text-center">
        <h1 className="text-4xl font-bold">Quote of the day</h1>
        <p className="text-balance text-muted-foreground">
          Your daily dose of inspiration.
        </p>
      </div>
      <QuoteCard {...quote} />
    </div>
  );
};

export default DailyQuote;
