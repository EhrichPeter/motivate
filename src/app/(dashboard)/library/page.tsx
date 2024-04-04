import Filter from "@/components/library/filter";
import QuoteList from "@/components/shared/quote-list";
import { findMany } from "@/server/quotes/queries";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Library() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["quotes"],
    queryFn: ({ pageParam }) => findMany({ pageParam }),
    initialPageParam: 0,
  });

  return (
    <main className="flex flex-col items-center w-full gap-8">
      <div className="grid text-center">
        <h1 className="text-4xl font-bold">Library</h1>
        <p className="text-balance text-muted-foreground">
          A collection of inspiring quotes.
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Filter />
        <QuoteList />
      </HydrationBoundary>
    </main>
  );
}
