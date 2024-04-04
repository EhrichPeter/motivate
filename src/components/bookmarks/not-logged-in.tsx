import { RocketIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

const NotLoggedIn = () => {
  return (
    <div className="flex w-full md:w-1/2">
      <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Sign up or log in to bookmark your favorite quotes
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NotLoggedIn;
