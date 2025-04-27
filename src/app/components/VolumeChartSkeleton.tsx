import { Skeleton } from '../components/ui/skeleton';

export default function VolumeChartSkeleton() {
  return (
    <div className="flex w-full flex-col rounded-xl bg-white p-4 dark:bg-[#191932] lg:p-6">
      <div className="flex flex-col">
        <Skeleton className="h-[26px] w-[120px]"></Skeleton>
        <Skeleton className="mt-3 h-7 w-[110px] sm:mt-6"></Skeleton>
        <Skeleton className="mt-2 h-6 w-[100px] sm:mt-4"></Skeleton>
      </div>
      <div className="flex h-full items-end justify-between gap-1">
        <Skeleton className="h-1/5 w-full" />
        <Skeleton className="h-3/5 w-full" />
        <Skeleton className="h-4/5 w-full" />
        <Skeleton className="h-[30%] w-full" />
        <Skeleton className="h-[70%] w-full" />
        <Skeleton className="h-1/2 w-full" />
        <Skeleton className="h-[90%] w-full" />
        <Skeleton className="h-2/5 w-full" />
        <Skeleton className="size-full" />
        <Skeleton className="h-[30%] w-full" />
        <Skeleton className="h-[70%] w-full" />
        <Skeleton className="h-1/2 w-full" />
        <Skeleton className="h-[90%] w-full" />
      </div>
      <div className="mt-2 flex justify-between gap-1">
        <Skeleton className="h-5 w-[41px]"></Skeleton>
        <Skeleton className="h-5 w-[41px]"></Skeleton>
        <Skeleton className="h-5 w-[41px]"></Skeleton>
        <Skeleton className="h-5 w-[41px]"></Skeleton>
        <Skeleton className="h-5 w-[41px]"></Skeleton>
        <Skeleton className="h-5 w-[41px]"></Skeleton>
      </div>
    </div>
  );
}
