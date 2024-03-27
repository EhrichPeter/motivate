import { getDailyQuote } from "@/server/quote";
import { getUnsplashPhoto } from "@/server/unsplash";
import Header from "./_components/header";
import QuoteCard from "./_components/quote_card";

export default async function Home() {
  const HOUR = 60 * 60;
  const quote = await getDailyQuote(HOUR);
  const photos = await getUnsplashPhoto(quote.q, HOUR, 1, 1);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <div id="content" className="my-auto m-10">
        <QuoteCard quote={quote} photos={photos} />
      </div>
    </main>
  );
}
