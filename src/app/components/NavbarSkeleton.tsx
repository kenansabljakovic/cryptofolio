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
          <Skeleton className="size-9 rounded-md sm:size-10 md:size-11 lg:size-12" />
        </div>
      </nav>

      <div
        data-mobile-navbar
        className="absolute inset-x-0 bottom-0 z-[9999] grid w-full grid-cols-3 border-t border-gray-200 bg-white/95 px-4 pt-3 backdrop-blur-xl dark:border-gray-800/50 dark:bg-[#13121A]/95 sm:hidden"
        style={{
          paddingBottom:
            'max(0.75rem, env(safe-area-inset-bottom, constant(safe-area-inset-bottom, 0px)))',
          height:
            'calc(var(--navbar-height, 68px) + env(safe-area-inset-bottom, constant(safe-area-inset-bottom, 0px)))',
        }}
      >
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
