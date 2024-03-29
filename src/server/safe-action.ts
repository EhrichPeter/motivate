import { createClient } from '@/utils/supabase/server';
import { DEFAULT_SERVER_ERROR, createSafeActionClient } from 'next-safe-action';

export const publicAction = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR;
  },
});

export const authAction = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR;
  },
  async middleware() {
    const supabase = createClient();

    const { user } = (await supabase.auth.getUser()).data;

    if (!user) {
      throw new Error('Log in to perform this action');
    }
    return { user_id: user.id };
  },
});
