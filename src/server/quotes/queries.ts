import { createClient } from "@/utils/supabase/server";
import { QuoteWithBookMark } from "./models";

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

export async function findMany(
  onlyShowBookmarked: boolean
): Promise<QuoteWithBookMark[]> {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;

  const quoteResult = await supabase
    .from("quotes")
    .select("*, bookmarks(*)")
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

  return onlyShowBookmarked ? res.filter((quote) => quote.bookmarked) : res;
}
