import QuoteCard from "@/components/daily-quote/quote-card";
import QuoteList from "@/components/daily-quote/quote-list";
import { findMany, findOneLatest } from "@/server/quotes/queries";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function DailyQuote() {
  const dailyQuote = await findOneLatest();

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["quotes"],
    queryFn: ({ pageParam }) => findMany({ pageParam }),
    initialPageParam: 1,
  });

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

      <HydrationBoundary state={dehydrate(queryClient)}>
        <QuoteList filterBookmarks={false} />
      </HydrationBoundary>
    </div>
  );
}
