import { createClient } from '@/utils/supabase/server';
import { getUnsplashPhoto } from '../unsplash/unsplash';
import { getDailyZenquote } from '../zenquote/quote';
import { Quote } from './models';

export async function cronInsertOne(): Promise<void> {
  const supabase = createClient();

  const quote = await getDailyZenquote();
  const photo = await getUnsplashPhoto(quote.q);

  await supabase.from('quotes').insert({
    author: quote.a,
    quote: quote.q,
    picture_link: photo.urls.regular,
    picture_alt: photo.description,
  });
}

export async function findOneLatest(): Promise<Quote | null> {
  const supabase = createClient();

  const latestQuoteQuery = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })
    .single();

  return latestQuoteQuery.data;
}
