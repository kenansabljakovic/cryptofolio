import { Skeleton } from '../components/ui/skeleton';

export default function SearchResultsListSkeleton() {
  return (
    <ul>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className="py-2 pl-2">
          <Skeleton className="h-[22px] md:w-[140px] lg:w-[170px] xl:w-[220px]" />
        </li>
      ))}
    </ul>
  );
}
