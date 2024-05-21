import { Skeleton } from "../components/ui/skeleton";

export default function CoinPageSkeleton() {
  return (
    <main className="max-w-[1440px] mx-auto xl:px-[72px] lg:px-[36px] px-[24px] mt-5 sm:mt-10 pb-10">
      <div className="w-full flex flex-wrap lg:flex-nowrap gap-5 sm:gap-8">
        <div className="w-full lg:w-1/2 xl:w-5/12 dark:bg-[#1E1932] bg-white rounded-xl py-5 px-4 sm:py-10 sm:px-8">
          <div className="flex items-center gap-2 sm:gap-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-[23px] w-[130px] md:h-[30px] md:w-[150px]" />
              <Skeleton className="h-4 md:h-5 w-[170px]" />
            </div>
          </div>
          <div className="mt-7 sm:mt-12 flex gap-4 items-end">
            <Skeleton className="h-8 w-[110px] sm:h-10 sm:w-[130px]" />
            <Skeleton className="h-6 w-[58px] sm:h-7 sm:w-[80px]" />
          </div>
          <div className="mt-5 sm:mt-8 border dark:bg-white bg-black dark:opacity-10 opacity-60"></div>
          <div className="mt-5 sm:mt-8 flex gap-4">
            <div className="mt-2">
              <Skeleton className="h-1 w-2" />
            </div>
            <div className="w-full space-y-2">
              <div className="w-full flex justify-between">
                <Skeleton className="h-6 w-[100px] sm:h-8 sm:w-[124px]" />
                <Skeleton className="h-6 w-[64px] sm:h-8 sm:w-[85px]" />
              </div>
              <Skeleton className="h-[18px] w-[180px] sm:h-5 sm:w-[208px]" />
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <div className="mt-2">
              <Skeleton className="h-1 w-2" />
            </div>
            <div className="w-full space-y-2">
              <div className="w-full flex justify-between">
                <Skeleton className="h-6 w-[100px] sm:h-8 sm:w-[124px]" />
                <Skeleton className="h-6 w-[64px] sm:h-8 sm:w-[85px]" />
              </div>
              <Skeleton className="h-[18px] w-[180px] sm:h-5 sm:w-[208px]" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
      <div className="border dark:bg-white bg-black dark:opacity-10 opacity-60 my-6 sm:my-8"></div>
      <div className="w-full grid lg:grid-cols-2 gap-6 ">
        <Skeleton className="h-[216px] w-full" />
        <Skeleton className="h-[216px] w-full" />
        <Skeleton className="h-[216px] w-full" />
      </div>
    </main>
  );
}
