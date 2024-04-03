"use server";

import { createClient } from "@/utils/supabase/server";
import { PaginatedQuoteResponse, QuoteWithBookMark } from "./models";

export async function findOneById(
  quote_id: number
): Promise<QuoteWithBookMark> {
  let bookmarked = false;

  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;

  const quoteResult = await supabase
    .from("quotes")
    .select("*, bookmarks(*)")
    .order("created_at", { ascending: false })
    .limit(1)
    .eq("id", quote_id)
    .single();

  if (quoteResult.error) {
    throw quoteResult.error;
  }

  return {
    ...quoteResult.data,
    bookmarked: user
      ? (bookmarked = quoteResult.data.bookmarks.some(
          (bookmark) => bookmark.user_id === user.id
        ))
      : false,
  };
}

export async function findOneLatest(): Promise<QuoteWithBookMark> {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;

  const quoteResult = await supabase
    .from("quotes")
    .select("*, bookmarks(*)")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (quoteResult.error) {
    throw quoteResult.error;
  }

  return {
    ...quoteResult.data,
    bookmarked: user
      ? quoteResult.data.bookmarks.some(
          (bookmark) => bookmark.user_id === user.id
        )
      : false,
  };
}

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
