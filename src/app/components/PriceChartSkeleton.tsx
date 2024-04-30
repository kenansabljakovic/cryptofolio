import { Skeleton } from "../components/ui/skeleton";

export default function PriceChartSkeleton() {
  return (
    <div className="w-full flex flex-col dark:bg-[#191932] bg-white rounded-xl pt-4 lg:pt-6 pb-4 lg:pb-6 px-4 lg:px-6">
      <div className="flex flex-col">
        <Skeleton className="w-[120px] h-[26px]"></Skeleton>
        <Skeleton className="w-[110px] h-7 mt-3 sm:mt-6"></Skeleton>
        <Skeleton className="w-[100px] h-6 mt-2 sm:mt-4"></Skeleton>
      </div>
      <div className="mt-8">
        <svg
          className="w-full animate-pulse"
          viewBox="0 0 100 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 10 Q 25 0, 50 10 T 100 10"
            stroke="#cacaca"
            fill="transparent"
          />
        </svg>
      </div>
      <div className="flex justify-between gap-1 mt-[84px]">
        <Skeleton className="w-[41px] h-5"></Skeleton>
        <Skeleton className="w-[41px] h-5"></Skeleton>
        <Skeleton className="w-[41px] h-5"></Skeleton>
        <Skeleton className="w-[41px] h-5"></Skeleton>
        <Skeleton className="w-[41px] h-5"></Skeleton>
        <Skeleton className="w-[41px] h-5"></Skeleton>
      </div>
    </div>
  );
}
