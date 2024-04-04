import QuoteList from "../shared/quote-list";

const AllQuotes = () => {
  return (
    <div className="flex flex-col items-center w-full gap-8">
      <div className="grid text-center pt-16">
        <h1 className="text-4xl font-bold">All Quotes</h1>
        <p className="text-balance text-muted-foreground">
          A collection of inspiring quotes.
        </p>
      </div>

      <QuoteList filterBookmarks={false} />
    </div>
  );
};

export default AllQuotes;
