import { Skeleton } from '../components/ui/skeleton';

export default function TimelineSkeleton() {
  return (
    <div className="flex w-full gap-1 rounded-md bg-[#CCCCFA]/40 p-1 dark:bg-[#232336] md:w-[400px] md:gap-1.5 lg:h-[42px] lg:w-[463px] lg:gap-2">
      {/* 7 timeline option skeletons (1D, 7D, 14D, 1M, 3M, 1Y, MAX) */}
      <Skeleton className="h-9 flex-1 rounded-md lg:h-[34px]" />
      <Skeleton className="h-9 flex-1 rounded-md lg:h-[34px]" />
      <Skeleton className="h-9 flex-1 rounded-md lg:h-[34px]" />
      <Skeleton className="h-9 flex-1 rounded-md lg:h-[34px]" />
      <Skeleton className="h-9 flex-1 rounded-md lg:h-[34px]" />
      <Skeleton className="h-9 flex-1 rounded-md lg:h-[34px]" />
      <Skeleton className="h-9 flex-1 rounded-md lg:h-[34px]" />
    </div>
  );
}
