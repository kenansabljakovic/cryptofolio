'use client';
import { useSearchParams } from 'next/navigation';
import TimelineDays from './TimelineDays';

const timelineOptions = [
  { id: '1d', display: '1D', value: 1 },
  { id: '7d', display: '7D', value: 7 },
  { id: '14d', display: '14D', value: 14 },
  { id: '1m', display: '1M', value: 30 },
  { id: '3m', display: '3M', value: 90 },
  { id: '1y', display: '1Y', value: 365 },
  { id: 'max', display: 'MAX', value: 0 },
];

export default function Timeline() {
  const searchParams = useSearchParams();
  // Add optional chaining to handle null searchParams in test environment
  const currentTimelineId = searchParams?.get('timeline') || '1d';

  return (
    <div className="flex w-full gap-1 rounded-md bg-[#CCCCFA]/40 p-1 dark:bg-[#232336] md:w-[400px] md:gap-1.5 lg:h-[42px] lg:w-[463px] lg:gap-2">
      {timelineOptions.map((option) => (
        <TimelineDays
          key={option.id}
          timelineOption={option}
          isActive={option.id === currentTimelineId}
        />
      ))}
    </div>
  );
}
