import { createClient } from '@/utils/supabase/server';
import { QuoteWithBookMark } from './models';

export async function findOneLatest(): Promise<QuoteWithBookMark | null> {
  let bookmarked = false;

  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;

  const quoteResult = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (quoteResult.error) {
    throw quoteResult.error;
  }

  if (user) {
    const bookmarkResult = await supabase
      .from('bookmarks')
      .select('*')
      .eq('quote_id', quoteResult.data.id)
      .eq('user_id', user.id)
      .limit(1)
      .single();

    if (bookmarkResult.data) {
      bookmarked = true;
    }
  }

  return {
    ...quoteResult.data,
    bookmarked,
  };
}

export async function findManyWithUserBookMarks(
  user_id: string
): Promise<QuoteWithBookMark[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`quotes (*)`)
    .eq('user_id', user_id);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const quotes = data.map((item) => ({ ...item.quotes, bookmarked: true }));

  return quotes.filter((quote) => quote !== null) as QuoteWithBookMark[];
}
