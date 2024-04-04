import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

const NoQuotes = () => {
  return (
    <div className="flex w-full md:w-1/2">
      <Alert>
        <MagnifyingGlassIcon className="h-4 w-4" />
        <AlertTitle>You have no saved quotes!</AlertTitle>
        <AlertDescription>
          Press the bookmark icon to save your favorite quotes
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NoQuotes;
