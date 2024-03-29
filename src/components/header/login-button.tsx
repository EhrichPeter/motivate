import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Button>
      <Link href="/login">Log in</Link>
    </Button>
  );
};
