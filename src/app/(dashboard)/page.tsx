import DailyQuote from "@/components/home/daily-quote";
import { findOneLatest } from "@/server/quotes/queries";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["latestQuote"],
    queryFn: findOneLatest,
  });

  return (
    <main className="flex flex-col items-center gap-8 w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DailyQuote />
      </HydrationBoundary>
    </main>
  );
}
