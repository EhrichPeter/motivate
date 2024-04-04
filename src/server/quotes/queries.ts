"use server";

import { createClient } from "@/utils/supabase/server";
import { PaginatedQuoteResponse } from "./models";

export async function findMany({
  limit = 5,
  pageParam = 0,
}: {
  filterBookmarks?: boolean;
  limit?: number;
  pageParam?: number;
}): Promise<PaginatedQuoteResponse> {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;

  const quoteResult = await supabase
    .from("quotes")
    .select("*, bookmarks(*)")
    .range(pageParam, pageParam + limit - 1)
    .order("created_at", { ascending: false });

  if (quoteResult.error) {
    throw quoteResult.error;
  }

  const res = quoteResult.data.map((quote) => ({
    ...quote,
    bookmarked: user
      ? quote.bookmarks.some((bookmark) => bookmark.user_id === user.id)
      : false,
  }));

  const paginatedResponse = {
    limit,
    cursor: pageParam,
    nextCursor: res.length === limit ? pageParam + limit : undefined,
    data: res,
  };

  return paginatedResponse;
}
