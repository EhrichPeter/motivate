import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { findMany } from "@/server/quotes/queries";
import ClientQuoteList from "./client-quote-list";

const ServerQuoteList = async (props: { filterBookmarks: boolean }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["quotes"],
    queryFn: ({ pageParam }) => findMany({ pageParam }),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientQuoteList filterBookmarks={props.filterBookmarks} />
    </HydrationBoundary>
  );
};

export default ServerQuoteList;
