"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/dist/client/components/navigation";
import { Badge } from "../ui/badge";

export const Filter = () => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const setFilter = (term?: string) => {
    const params = new URLSearchParams();
    if (term) {
      params.set("tag", term);
    } else {
      params.delete("tag");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");

  return (
    <div className="flex gap-4 w-full md:w-1/2">
      <Badge
        className="cursor-pointer size-12"
        variant={currentTag === null ? "default" : "outline"}
        onClick={() => setFilter()}
      >
        All
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={currentTag === "bookmarked" ? "default" : "outline"}
        onClick={() => setFilter("bookmarked")}
      >
        Bookmarked
      </Badge>
    </div>
  );
};

export default Filter;
