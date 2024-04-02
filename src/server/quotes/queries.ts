import { createClient } from "@/utils/supabase/server";
import { QuoteWithBookMark } from "./models";

export async function findOneLatest(): Promise<QuoteWithBookMark | null> {
  let bookmarked = false;

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
      ? (bookmarked = quoteResult.data.bookmarks.some(
          (bookmark) => bookmark.user_id === user.id
        ))
      : false,
  };
}

export async function findManyforUserWithBookMarks(
  user_id: string
): Promise<QuoteWithBookMark[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`quotes (*)`)
    .eq("user_id", user_id);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const quotes = data.map((item) => ({ ...item.quotes, bookmarked: true }));

  return quotes.filter((quote) => quote !== null) as QuoteWithBookMark[];
}

export async function findMany(): Promise<QuoteWithBookMark[] | null> {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;

  const quoteResult = await supabase
    .from("quotes")
    .select("*, bookmarks(*)")
    .order("created_at", { ascending: false });

  if (quoteResult.error) {
    throw quoteResult.error;
  }

  return quoteResult.data.map((quote) => ({
    ...quote,
    bookmarked: user
      ? quote.bookmarks.some((bookmark) => bookmark.user_id === user.id)
      : false,
  }));
}
