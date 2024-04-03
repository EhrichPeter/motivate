import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BookIcon } from "lucide-react";

export function StoryDialog(props: { story: string; headline: string }) {
  const { story, headline } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <BookIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full container p-8">
        <AlertDialogHeader>
          <AlertDialogTitle>{headline}</AlertDialogTitle>
          <AlertDialogDescription>{story}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Back</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
