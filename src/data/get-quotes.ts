import { QuoteWithBookMark } from "@/server/quotes/models";
import { findMany } from "@/server/quotes/queries";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetQuotes() {
  return useInfiniteQuery({
    queryKey: ["quotes"],
    queryFn: ({ pageParam }) => findMany({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
