import QuoteList from "@/components/daily-quote/quote-list";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { findMany } from "@/server/quotes/queries";
import { createClient } from "@/utils/supabase/server";
import { MagnifyingGlassIcon, RocketIcon } from "@radix-ui/react-icons";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Bookmarks() {
  const supabase = createClient();

  const { user } = (await supabase.auth.getUser()).data;

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["quotes"],
    queryFn: ({ pageParam }) => findMany({ pageParam }),
    initialPageParam: 0,
  });

  if (!user) {
    return (
      <div className="flex w-full md:w-1/2">
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Sign up or log in to bookmark your favorite quotes
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { data: quotes } = await findMany({ filterBookmarks: true });
  if (quotes.length === 0) {
    return (
      <div className="flex w-full md:w-1/2">
        <Alert>
          <MagnifyingGlassIcon className="h-4 w-4" />
          <AlertTitle>You have no saved quotes!</AlertTitle>
          <AlertDescription>
            Press the bookmark icon to save your favorite quotes
          </AlertDescription>
        </Alert>
      </div>
    );
  }

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
}
