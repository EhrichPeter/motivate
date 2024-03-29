import DailyCountdownTimer from "@/components/daily-quote/countdown";
import QuoteCard from "@/components/daily-quote/quote_card";
import { getDailyQuote } from "@/server/quote/quote";
import { getUnsplashPhoto } from "@/server/unsplash/unsplash";

export default async function DailyQuote() {
  const HOUR = 60 * 60;
  const quote = await getDailyQuote(HOUR);
  const photos = await getUnsplashPhoto(quote.q, HOUR, 1, 1);

  return (
    <div className="flex flex-col items-center gap-8 pt-6 w-full">
      <div className="grid text-center">
        <h1 className="text-4xl font-bold">Quote of the day</h1>
        <p className="text-balance text-muted-foreground">
          Your daily dose of inspiration.
        </p>
        {/* <DailyCountdownTimer
          targetHour={0}
          targetMinute={0}
          timeZone="America/New_York"
        /> */}
      </div>

      <QuoteCard quote={quote} photo={photos[0]} />
    </div>
  );
}
