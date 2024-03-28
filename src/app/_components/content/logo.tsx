import { QuoteIcon } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center gap-5">
      <Link href="/">
        <div className="flex items-center gap-2">
          <QuoteIcon size={24} />
          <h1 className="text-lg font-bold">quote</h1>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
