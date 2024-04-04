"use client";
import QuoteCard from "../shared/quote-card";
import { useGetLatestQuote } from "@/data/get-latest-quote";

const DailyQuote = () => {
  const { data: quote } = useGetLatestQuote();

  if (!quote) return null;

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
