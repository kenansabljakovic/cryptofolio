//Instead of spinner later implement skeleton

import { Skeleton } from '../components/ui/skeleton';

export default function TableCoinsSkeleton() {
  return (
    <div className="flex bg-white dark:bg-[#191925]">
      <Skeleton className="h-8 px-1 sm:h-12 sm:px-4" />
    </div>
  );
}
