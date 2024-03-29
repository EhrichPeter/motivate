import QuoteCard from "@/components/daily-quote/quote-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Quote } from "@/server/quotes/models";
import { findManyWithUserBookMarks } from "@/server/quotes/queries";
import { createClient } from "@/utils/supabase/server";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { RocketIcon } from "lucide-react";

export default async function Bookmarks() {
  const supabase = createClient();
  let quotes: Quote[] | null = [];

  const { user } = (await supabase.auth.getUser()).data;

  if (user) {
    quotes = await findManyWithUserBookMarks(user.id);
    if (!quotes || quotes.length === 0) {
      return (
        <div className="flex w-full md:w-1/2">
          <Alert>
            <MagnifyingGlassIcon className="h-4 w-4" />
            <AlertTitle>You have no saved quotes!</AlertTitle>
            <AlertDescription>
              Press the bookmark icon to save your favorite quotes
            </AlertDescription>
          </Alert>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center gap-8 pt-6 w-full">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} {...quote} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full md:w-1/2">
      <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Sign up or log in to bookmark your favorite quotes
        </AlertDescription>
      </Alert>
    </div >
  );
}
