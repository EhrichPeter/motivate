import { AuthError } from "@supabase/supabase-js";
import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";

export const publicAction = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR;
  },
});
