import { Skeleton } from '../components/ui/skeleton';

export default function NavbarSkeleton() {
  return (
    <div className="w-full bg-white dark:bg-[#13121A]">
      <nav className="mx-auto flex max-w-[1440px] justify-between px-6 py-4 sm:px-[42px] xl:px-[72px]">
        <div className="flex items-center gap-[10px]">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="hidden h-6 w-[120px] lg:inline lg:h-7 lg:w-[140px]" />
        </div>

        <div className="hidden sm:flex sm:gap-7 lg:gap-14">
          <div className="flex items-center gap-[10px]">
            <Skeleton className="h-9 w-[80px] rounded-md sm:h-8 sm:w-[70px]" />
          </div>
          <div className="flex items-center gap-[10px]">
            <Skeleton className="h-9 w-[90px] rounded-md sm:h-8 sm:w-[80px]" />
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4">
          <Skeleton className="h-9 w-[50px] rounded-md sm:h-10 sm:w-[130px] md:h-11 md:w-[200px] lg:h-12 lg:w-[286px] xl:h-12 xl:w-[356px]" />
          <Skeleton className="h-9 w-[60px] rounded-md sm:h-10 sm:w-[70px] md:h-11 lg:h-12" />
          <Skeleton className="h-9 w-9 rounded-md sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12" />
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 z-50 grid h-16 w-full grid-cols-3 border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-[#13121A] sm:hidden">
        <div className="inline-flex flex-col items-center justify-center px-5">
          <Skeleton className="size-6 rounded-md" />
          <Skeleton className="mt-1 h-3 w-10" />
        </div>
        <div className="inline-flex flex-col items-center justify-center px-5">
          <Skeleton className="size-6 rounded-md" />
          <Skeleton className="mt-1 h-3 w-14" />
        </div>
        <div className="inline-flex flex-col items-center justify-center px-5">
          <Skeleton className="size-6 rounded-md" />
          <Skeleton className="mt-1 h-3 w-16" />
        </div>
      </div>
    </div>
  );
}
