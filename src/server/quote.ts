export type Quote = {
  q: string;
  a: string;
  h: string;
};

export async function getDailyQuote(revalidate: number): Promise<Quote> {
  try {
    const res = await fetch("https://zenquotes.io/api/today", {
      next: { revalidate },
    });
    const data: Quote[] = await res.json();
    return data[0];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch daily quote");
  }
}
