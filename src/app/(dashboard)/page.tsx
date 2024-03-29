import QuoteCard from "@/components/daily-quote/quote-card";
import { findOneLatest } from "@/server/quotes/quotes";


export default async function DailyQuote() {
  const quote = await findOneLatest();

  if (!quote) {
    return <h1>No Quote found</h1>
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-6 w-full">
      <div className="grid text-center">
        <h1 className="text-4xl font-bold">Quote of the day</h1>
        <p className="text-balance text-muted-foreground">
          Your daily dose of inspiration.
        </p>
      </div>

      <QuoteCard {...quote} />
    </div>
  );
}
