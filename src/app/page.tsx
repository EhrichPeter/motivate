
import { getRandomHeadline } from "@/lib/headlines";
import { Suspense } from "react";

export type Quote = {
  q: string;
  a: string;
  h: string;
};

async function getDailyQuote() {
  try {
    const res = await fetch("https://zenquotes.io/api/today");
    const data: Quote[] = await res.json();
    return data[0].q;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch daily quote");
  }
}

export default async function Page() {
  const quote = await getDailyQuote();
  const headline = getRandomHeadline();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-6xl font-bold text-center decoration-primary ">{headline}</h1>
      <Suspense fallback={<p>Loading quote..</p>}>
        <blockquote className="mt-10 border-l-2 border-primary pl-6 italic text-center">{quote}</blockquote>
      </Suspense>
    </main>
  );
}
