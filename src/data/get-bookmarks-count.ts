import { countBookmarkedQuotes } from "@/server/quotes/queries";
import { useQuery } from "@tanstack/react-query";

export function useGetBookmarksCount() {
  return useQuery({
    queryKey: ["bookmarksCount"],
    queryFn: () => countBookmarkedQuotes(),
  });
}
