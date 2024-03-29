import React from "react";
import QuoteCard from "./quote_card";
import { createClient } from "@/utils/supabase/server";
import { getDailyQuote } from "@/server/quote/quote";
import { getUnsplashPhoto } from "@/server/unsplash/unsplash";

export const Content = async () => {
  const HOUR = 60 * 60;
  const quote = await getDailyQuote(HOUR);
  const photos = await getUnsplashPhoto(quote.q, HOUR, 1, 1);

  return (
    <div className="w-full md:w-1/2 my-auto">
      <QuoteCard
        quote={quote}
        photos={photos}
        title="Quote of the Day"
        description="Your daily dose of inspiration"
      />
    </div>
  );
};

export default Content;
