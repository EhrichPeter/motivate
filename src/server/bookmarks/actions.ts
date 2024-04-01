'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { authAction } from '../safe-action';
import { toggleBookMarkSchema } from './models';

export const toggleBookmark = authAction(
  toggleBookMarkSchema,
  async ({ quote_id }, { user_id }) => {
    const supabase = createClient();

    let new_state: boolean;

    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('quote_id', quote_id)
      .eq('user_id', user_id)
      .single();

    if (data) {
      await supabase
        .from('bookmarks')
        .delete()
        .eq('quote_id', quote_id)
        .eq('user_id', user_id);

      new_state = false;
    } else {
      await supabase.from('bookmarks').insert({ user_id, quote_id });
      new_state = true;
    }

    revalidatePath('/');
    return new_state;
  }
);
