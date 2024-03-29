'use server';

import { createClient } from '@/utils/supabase/server';
import { getUnsplashPhoto } from '../unsplash/queries';
import { getDailyZenquote } from '../zenquote/queries';

export async function cronCreateOne(): Promise<void> {
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
