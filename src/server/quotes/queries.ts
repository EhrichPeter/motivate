import { createClient } from '@/utils/supabase/server';
import { Quote } from './models';

export async function findOneLatest(): Promise<Quote | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function findManyWithUserBookMarks(
  user_id: string
): Promise<Quote[] | null> {
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

  const quotes = data.map((item) => item.quotes);

  return quotes.filter((quote) => quote !== null) as Quote[];
}
