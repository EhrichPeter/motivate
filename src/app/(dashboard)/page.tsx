import QuoteCard from "@/components/daily-quote/quote-card";
import ServerQuoteList from "@/components/daily-quote/server-quote-list";
import { findMany, findOneLatest } from "@/server/quotes/queries";

export default async function DailyQuote() {
  const dailyQuote = await findOneLatest();

  return (
    <div className="flex flex-col items-center gap-8 pt-6 w-full">
      <div className="grid text-center">
        <h1 className="text-4xl font-bold">Quote of the day</h1>
        <p className="text-balance text-muted-foreground">
          Your daily dose of inspiration.
        </p>
      </div>

      <QuoteCard {...dailyQuote} />

      <div className="grid text-center pt-16">
        <h1 className="text-4xl font-bold">Past Quotes</h1>
        <p className="text-balance text-muted-foreground">
          Relive the past moments of inspiration.
        </p>
      </div>

      <ServerQuoteList filterBookmarks={false} />
    </div>
  );
}
