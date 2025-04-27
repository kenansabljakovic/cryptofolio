import { Skeleton } from '../components/ui/skeleton';

export default function CoinPageSkeleton() {
  return (
    <main className="mx-auto mt-5 max-w-[1440px] px-[24px] pb-10 sm:mt-10 lg:px-[36px] xl:px-[72px]">
      <div className="flex w-full flex-wrap gap-5 sm:gap-8 lg:flex-nowrap">
        <div className="w-full rounded-xl bg-white px-4 py-5 dark:bg-[#1E1932] sm:px-8 sm:py-10 lg:w-1/2 xl:w-5/12">
          <div className="flex items-center gap-2 sm:gap-6">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-[23px] w-[130px] md:h-[30px] md:w-[150px]" />
              <Skeleton className="h-4 w-[170px] md:h-5" />
            </div>
          </div>
          <div className="mt-7 flex items-end gap-4 sm:mt-12">
            <Skeleton className="h-8 w-[110px] sm:h-10 sm:w-[130px]" />
            <Skeleton className="h-6 w-[58px] sm:h-7 sm:w-[80px]" />
          </div>
          <div className="mt-5 border bg-black opacity-60 dark:bg-white dark:opacity-10 sm:mt-8"></div>
          <div className="mt-5 flex gap-4 sm:mt-8">
            <div className="mt-2">
              <Skeleton className="h-1 w-2" />
            </div>
            <div className="w-full space-y-2">
              <div className="flex w-full justify-between">
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
              <div className="flex w-full justify-between">
                <Skeleton className="h-6 w-[100px] sm:h-8 sm:w-[124px]" />
                <Skeleton className="h-6 w-[64px] sm:h-8 sm:w-[85px]" />
              </div>
              <Skeleton className="h-[18px] w-[180px] sm:h-5 sm:w-[208px]" />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col lg:w-1/2 xl:w-7/12">
          <Skeleton className="size-full" />
        </div>
      </div>
      <div className="my-6 border bg-black opacity-60 dark:bg-white dark:opacity-10 sm:my-8"></div>
      <div className="grid w-full gap-6 lg:grid-cols-2">
        <Skeleton className="h-[216px] w-full" />
        <Skeleton className="h-[216px] w-full" />
        <Skeleton className="h-[216px] w-full" />
      </div>
    </main>
  );
}
