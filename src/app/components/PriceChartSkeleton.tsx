import { Skeleton } from '../components/ui/skeleton';

export default function PriceChartSkeleton() {
  return (
    <div className="flex w-full flex-col rounded-xl bg-white p-4 dark:bg-[#191932] lg:p-6">
      <div className="flex flex-col">
        <Skeleton className="h-[26px] w-[120px]"></Skeleton>
        <Skeleton className="mt-3 h-7 w-[110px] sm:mt-6"></Skeleton>
        <Skeleton className="mt-2 h-6 w-[100px] sm:mt-4"></Skeleton>
      </div>
      <div className="mt-8">
        <svg
          className="w-full animate-pulse"
          viewBox="0 0 100 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 10 Q 25 0, 50 10 T 100 10" stroke="#cacaca" fill="transparent" />
        </svg>
      </div>
      <div className="mt-[84px] flex justify-between gap-1">
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
