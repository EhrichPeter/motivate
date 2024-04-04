import BookmarkedQuotes from "@/components/bookmarks/bookmarked-quotes";
import NotLoggedIn from "@/components/bookmarks/not-logged-in";
import { createClient } from "@/utils/supabase/server";

export default async function Bookmarks() {
  const supabase = createClient();

  const { user } = (await supabase.auth.getUser()).data;

  if (!user) {
    return <NotLoggedIn />;
  } else {
    return <BookmarkedQuotes />;
  }
}
