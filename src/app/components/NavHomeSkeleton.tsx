import { Skeleton } from '../components/ui/skeleton';

export default function NavHomeSkeleton() {
  return (
    <nav className="mx-auto mt-5 hidden max-w-[1440px] px-6 sm:mt-10 sm:block sm:px-[42px] xl:px-[72px]">
      <div className="flex w-[343px] gap-1 rounded-md bg-white p-1 dark:bg-[#191925] lg:w-[400px] xl:w-[495px]">
        <Skeleton className="h-10 w-1/2 rounded-md" />
        <Skeleton className="h-10 w-1/2 rounded-md" />
      </div>
    </nav>
  );
}
