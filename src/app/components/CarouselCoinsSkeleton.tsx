import { Skeleton } from '../components/ui/skeleton';

export default function MarketDataHeaderSkeleton() {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:hidden">
        <div className="flex w-full cursor-pointer items-center gap-1 rounded-lg bg-[rgb(255,255,255)] p-2 dark:bg-[rgb(35,35,54)] sm:dark:bg-[#191925]">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-[18px] w-[30px]" />
        </div>
        <div className="flex w-full cursor-pointer items-center gap-1 rounded-lg bg-[rgb(255,255,255)] p-2 dark:bg-[rgb(35,35,54)] sm:dark:bg-[#191925]">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-[18px] w-[30px]" />
        </div>
        <div className="flex w-full cursor-pointer items-center gap-1 rounded-lg bg-[rgb(255,255,255)] p-2 dark:bg-[rgb(35,35,54)] sm:dark:bg-[#191925]">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-[18px] w-[30px]" />
        </div>
        <div className="flex w-full cursor-pointer items-center gap-1 rounded-lg bg-[rgb(255,255,255)] p-2 dark:bg-[rgb(35,35,54)] sm:dark:bg-[#191925]">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-[18px] w-[30px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className="hidden sm:flex sm:justify-center">
          <div className="flex w-full cursor-pointer items-center gap-1 rounded-lg bg-[rgb(255,255,255)] p-2 dark:bg-[#232336] sm:h-[88px] sm:gap-4 sm:px-4 sm:dark:bg-[#191925]">
            <Skeleton className="size-6 rounded-full sm:size-8" />
            <div className="flex flex-col items-center gap-4 sm:items-start sm:gap-0">
              <Skeleton className="mb-2 h-5 w-[100px]" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex sm:justify-center">
          <div className="flex w-full cursor-pointer items-center gap-1 rounded-lg bg-[rgb(255,255,255)] p-2 dark:bg-[#232336] sm:h-[88px] sm:gap-4 sm:px-4 sm:dark:bg-[#191925]">
            <Skeleton className="size-6 rounded-full sm:size-8" />
            <div className="flex flex-col items-center gap-4 sm:items-start sm:gap-0">
              <Skeleton className="mb-2 h-5 w-[100px]" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:justify-center">
          <div className="flex w-full cursor-pointer items-center gap-1 rounded-lg bg-[rgb(255,255,255)] p-2 dark:bg-[#232336] sm:h-[88px] sm:gap-4 sm:px-4 sm:dark:bg-[#191925]">
            <Skeleton className="size-6 rounded-full sm:size-8" />
            <div className="flex flex-col items-center gap-4 sm:items-start sm:gap-0">
              <Skeleton className="mb-2 h-5 w-[100px]" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-center">
          <div className="flex w-full cursor-pointer items-center gap-1 rounded-lg bg-[rgb(255,255,255)] p-2 dark:bg-[#232336] sm:h-[88px] sm:gap-4 sm:px-4 sm:dark:bg-[#191925]">
            <Skeleton className="size-6 rounded-full sm:size-8" />
            <div className="flex flex-col items-center gap-4 sm:items-start sm:gap-0">
              <Skeleton className="mb-2 h-5 w-[100px]" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden xl:flex xl:justify-center">
          <div className="flex w-full cursor-pointer items-center gap-1 rounded-lg bg-[rgb(255,255,255)] p-2 dark:bg-[#232336] sm:h-[88px] sm:gap-4 sm:px-4 sm:dark:bg-[#191925]">
            <Skeleton className="size-6 rounded-full sm:size-8" />
            <div className="flex flex-col items-center gap-4 sm:items-start sm:gap-0">
              <Skeleton className="mb-2 h-5 w-[100px]" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
