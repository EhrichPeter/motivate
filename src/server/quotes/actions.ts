"use server";

import { createClient } from "@/utils/supabase/server";
import { getUnsplashPhoto } from "../unsplash/queries";
import { getDailyZenquote } from "../zenquote/queries";
import OpenAI from "openai";

export async function cronCreateOne(): Promise<void> {
  const supabase = createClient();
  const openai = new OpenAI();

  const quote = await getDailyZenquote();
  console.log("quote", quote.q);

  const keywordCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Given a quote, our API generates a single keyword to find a matching photo. Please only reply with that keyword and no other punctuation marks.",
      },
      {
        role: "user",
        content: quote.q,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log("completion", keywordCompletion.choices[0].message.content);

  const photo = await getUnsplashPhoto(
    keywordCompletion.choices[0].message.content ?? quote.q
  );

  console.log("photo", photo.description);

  const storyCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Welcome! With our system, you can provide a quote and a brief description of a photo, and our API will craft a compelling and uplifting message inspired by them. Please provide the quote first, followed by the photo description. The story should be text only with no headlines. Dont include names. Include some paragraphs.",
      },
      {
        role: "user",
        content: quote.q,
      },
      {
        role: "user",
        content:
          photo.description ?? keywordCompletion.choices[0].message.content,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log("story", storyCompletion.choices[0].message.content);

  const headlineCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Generate a very short headline based on a quote a photo description and a story. Please provide the quote first, followed by the photo description and the story. The headline should be a short single sentence without quotation marks in title case.",
      },
      {
        role: "user",
        content: quote.q,
      },
      {
        role: "user",
        content:
          photo.description ?? keywordCompletion.choices[0].message.content,
      },
      {
        role: "user",
        content:
          storyCompletion.choices[0].message.content ??
          "A story about the quote and photo",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log("headline", headlineCompletion.choices[0].message.content);

  await supabase.from("quotes").insert({
    author: quote.a,
    quote: quote.q,
    picture_link: photo.urls.regular,
    picture_alt: photo.description ?? "An inspirational photo",
    story: storyCompletion.choices[0].message.content,
    headline: headlineCompletion.choices[0].message.content,
  });
}
