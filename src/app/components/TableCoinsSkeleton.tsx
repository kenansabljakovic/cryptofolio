//Instead of spinner later implement skeleton

import { Skeleton } from "../components/ui/skeleton";

export default function TableCoinsSkeleton() {
  return (
    <div className="dark:bg-[#191925] bg-white flex">
      <Skeleton className="h-8 sm:h-12 px-1 sm:px-4" />
    </div>
  );
}
