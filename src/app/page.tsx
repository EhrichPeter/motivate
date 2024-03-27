import { getDailyQuote } from "@/server/quote";
import { getUnsplashPhoto } from "@/server/unsplash";
import Header from "./_components/header";
import QuoteCard from "./_components/quote_card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  const HOUR = 60 * 60;
  const quote = await getDailyQuote(HOUR);
  const photos = await getUnsplashPhoto(quote.q, HOUR, 1, 1);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <div className="my-20 px-8">
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
        </Tabs>
      </div>
    </main>
  );
}
