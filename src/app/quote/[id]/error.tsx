"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 pt-16">
      <h2>Quote not found!</h2>
      <Link href="/">
        <Button>Go to dashboard</Button>
      </Link>
    </div>
  );
}
