import { Skeleton } from "../components/ui/skeleton";

export default function VolumeChartSkeleton() {
  return (
    <div className="w-full flex flex-col dark:bg-[#191932] bg-white rounded-xl pt-4 lg:pt-6 pb-4 lg:pb-6 px-4 lg:px-6">
      <div className="flex flex-col">
        <Skeleton className="w-[120px] h-[26px]"></Skeleton>
        <Skeleton className="w-[110px] h-7 mt-3 sm:mt-6"></Skeleton>
        <Skeleton className="w-[100px] h-6 mt-2 sm:mt-4"></Skeleton>
      </div>
      <div className="flex justify-between gap-1 h-full items-end">
        <Skeleton className="w-full h-[20%]" />
        <Skeleton className="w-full h-[60%]" />
        <Skeleton className="w-full h-[80%]" />
        <Skeleton className="w-full h-[30%]" />
        <Skeleton className="w-full h-[70%]" />
        <Skeleton className="w-full h-[50%]" />
        <Skeleton className="w-full h-[90%]" />
        <Skeleton className="w-full h-[40%]" />
        <Skeleton className="w-full h-[100%]" />
        <Skeleton className="w-full h-[30%]" />
        <Skeleton className="w-full h-[70%]" />
        <Skeleton className="w-full h-[50%]" />
        <Skeleton className="w-full h-[90%]" />
      </div>
      <div className="flex justify-between gap-1 mt-2">
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
