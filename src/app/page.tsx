export type Quote = {
  q: string;
  a: string;
  h: string;
};

async function getDailyQuote() {
  try {
    const res = await fetch("https://zenquotes.io/api/today", {
      next: { revalidate: 60 * 60 * 1 },
    });
    const data: Quote[] = await res.json();
    return data[0];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch daily quote");
  }
}

export default async function Page() {
  const quote = await getDailyQuote();

  return (
    <main className="flex min-h-screen flex-col">
      <div className="my-auto border border-primary rounded-xl text-center m-10 md:m-24 p-5">
        <blockquote className="italic text-xl">
          &quot;{quote.q}&quot;
        </blockquote>
        -<cite>{quote.a}</cite>
      </div>
      <footer className="text-center text-sm text-gray-500 m-10 md:m-24">
        <p>
          Inspirational quotes provided by{" "}
          <a href="https://zenquotes.io/" target="_blank">
            ZenQuotes API
          </a>
        </p>
        <p>
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Peter Ehrich
        </p>
      </footer>
    </main>
  );
}
