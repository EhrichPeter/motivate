import QuoteCard from "@/components/daily-quote/quote_card";
import { getDailyQuote } from "@/server/quote/quote";
import { getUnsplashPhoto } from "@/server/unsplash/unsplash";

export default async function DailyQuote() {
  const HOUR = 60 * 60;
  const quote = await getDailyQuote(HOUR);
  const photos = await getUnsplashPhoto(quote.q, HOUR, 1, 1);

  return (
    <div className="w-full md:w-1/2 ">
      <QuoteCard
        quote={quote}
        photos={photos}
        title="Quote of the Day"
        description="Your daily dose of inspiration"
      />
    </div>
  );
}
