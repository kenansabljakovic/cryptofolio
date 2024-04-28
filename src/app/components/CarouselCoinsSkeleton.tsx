import { Skeleton } from "../components/ui/skeleton";

export default function MarketDataHeaderSkeleton() {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:hidden">
        <div className="dark:bg-[rgb(35,35,54)] sm:dark:bg-[#191925] bg-[rgb(255,255,255)] px-2 py-2 w-full flex items-center gap-1 rounded-lg cursor-pointer">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-[30px] h-[18px]" />
        </div>
        <div className="dark:bg-[rgb(35,35,54)] sm:dark:bg-[#191925] bg-[rgb(255,255,255)] px-2 py-2 w-full flex items-center gap-1 rounded-lg cursor-pointer">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-[30px] h-[18px]" />
        </div>
        <div className="dark:bg-[rgb(35,35,54)] sm:dark:bg-[#191925] bg-[rgb(255,255,255)] px-2 py-2 w-full flex items-center gap-1 rounded-lg cursor-pointer">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-[30px] h-[18px]" />
        </div>
        <div className="dark:bg-[rgb(35,35,54)] sm:dark:bg-[#191925] bg-[rgb(255,255,255)] px-2 py-2 w-full flex items-center gap-1 rounded-lg cursor-pointer">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-[30px] h-[18px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        <div className="hidden sm:flex sm:justify-center">
          <div className="dark:bg-[#232336] sm:dark:bg-[#191925] bg-[rgb(255,255,255)] px-2 py-2 w-full sm:h-[88px] flex items-center gap-1 sm:gap-4 rounded-lg cursor-pointer sm:px-4">
            <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
            <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-0">
              <Skeleton className="w-[100px] h-5 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="w-[60px] h-4" />
                <Skeleton className="w-[50px] h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex sm:justify-center">
          <div className="dark:bg-[#232336] sm:dark:bg-[#191925] bg-[rgb(255,255,255)] px-2 py-2 w-full sm:h-[88px] flex items-center gap-1 sm:gap-4 rounded-lg cursor-pointer sm:px-4">
            <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
            <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-0">
              <Skeleton className="w-[100px] h-5 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="w-[60px] h-4" />
                <Skeleton className="w-[50px] h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:justify-center">
          <div className="dark:bg-[#232336] sm:dark:bg-[#191925] bg-[rgb(255,255,255)] px-2 py-2 w-full sm:h-[88px] flex items-center gap-1 sm:gap-4 rounded-lg cursor-pointer sm:px-4">
            <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
            <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-0">
              <Skeleton className="w-[100px] h-5 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="w-[60px] h-4" />
                <Skeleton className="w-[50px] h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:justify-center">
          <div className="dark:bg-[#232336] sm:dark:bg-[#191925] bg-[rgb(255,255,255)] px-2 py-2 w-full sm:h-[88px] flex items-center gap-1 sm:gap-4 rounded-lg cursor-pointer sm:px-4">
            <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
            <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-0">
              <Skeleton className="w-[100px] h-5 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="w-[60px] h-4" />
                <Skeleton className="w-[50px] h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden xl:flex xl:justify-center">
          <div className="dark:bg-[#232336] sm:dark:bg-[#191925] bg-[rgb(255,255,255)] px-2 py-2 w-full sm:h-[88px] flex items-center gap-1 sm:gap-4 rounded-lg cursor-pointer sm:px-4">
            <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
            <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-0">
              <Skeleton className="w-[100px] h-5 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="w-[60px] h-4" />
                <Skeleton className="w-[50px] h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
