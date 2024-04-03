import { Tables } from "../../../types/supabase";

export type Quote = Tables<"quotes">;
export type BookMarks = Tables<"bookmarks">;

export type QuoteWithBookMark = Quote & { bookmarked: boolean } & {
  bookmarks: BookMarks[];
};

export type PaginatedQuoteResponse = {
  cursor: number;
  nextCursor: number | undefined;
  limit: number;
  data: QuoteWithBookMark[];
};
