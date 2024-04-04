import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import QuoteList from "../shared/quote-list";
import { findMany } from "@/server/quotes/queries";

const BookmarkedQuotes = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["quotes"],
    queryFn: ({ pageParam }) => findMany({ pageParam }),
    initialPageParam: 0,
  });

  return (
    <div className="flex flex-col items-center gap-8 pt-6 w-full">
      <div className="grid text-center">
        <h1 className="text-4xl font-bold">Bookmarks</h1>
        <p className="text-balance text-muted-foreground">
          Your favorite quotes saved for later.
        </p>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <QuoteList filterBookmarks={true} />
      </HydrationBoundary>
    </div>
  );
};
export default BookmarkedQuotes;
