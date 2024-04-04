import { findOneLatest } from "@/server/quotes/queries";
import { useQuery } from "@tanstack/react-query";

export function useGetLatestQuote() {
  return useQuery({
    queryKey: ["latestQuote"],
    queryFn: () => findOneLatest(),
  });
}
