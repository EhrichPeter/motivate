import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import Link from "next/link";

const NoQuotes = () => {
  return (
    <div className="flex w-full md:w-1/2">
      <Alert>
        <MagnifyingGlassIcon className="h-4 w-4" />
        <AlertTitle>No quotes matched your filter!</AlertTitle>
        <AlertDescription>
          Try a different filter or{" "}
          <Link href="/library" className="text-primary underline">
            view all quotes
          </Link>
          .
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NoQuotes;
