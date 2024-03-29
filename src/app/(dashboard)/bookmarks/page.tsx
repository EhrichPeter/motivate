import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { createClient } from "@/utils/supabase/server";
import { RocketIcon } from "lucide-react";

export default async function Bookmarks() {
  const supabase = createClient();

  const { user } = (await supabase.auth.getUser()).data;

  return (
    <div className="pt-4">
      {user ? (
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Youre logged in with {user.email}!</AlertTitle>
          <AlertDescription>
            In this upcoming section you will be able to see your favorite
            quotes
          </AlertDescription>
        </Alert>
      ) : (
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Sign up or log in to bookmark your favorite quotes
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
