import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RocketIcon } from "lucide-react";
import React from "react";
import QuoteCard from "./content/quote_card";
import { createClient } from "@/utils/supabase/server";
import { getDailyQuote } from "@/server/quote/quote";
import { getUnsplashPhoto } from "@/server/unsplash/unsplash";

export const Content = async () => {
  const supabase = createClient();

  const { user } = (await supabase.auth.getUser()).data;

  const HOUR = 60 * 60;
  const quote = await getDailyQuote(HOUR);
  const photos = await getUnsplashPhoto(quote.q, HOUR, 1, 1);

  return (
    <div className="mt-20 w-full md:w-1/2">
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">Daily Quote</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <QuoteCard
            quote={quote}
            photos={photos}
            title="Quote of the Day"
            description="Your daily dose of inspiration"
          />
        </TabsContent>

        <TabsContent value="bookmarks" className="flex flex-col items-center">
          {user ? (
            <h1>You&apos;re logged in!</h1>
          ) : (
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                Sign up or log in to bookmark your favorite quotes
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Content;
