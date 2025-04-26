'use client';
import { useAppSelector } from '../../redux/store';
import TimelineDays from './TimelineDays';
export default function Timeline() {
  const timeline = useAppSelector((state) => state.timeline.timeline);

  return (
    <div className="flex w-full gap-1 rounded-md bg-[#CCCCFA]/40 p-1 dark:bg-[#232336] md:w-[400px] md:gap-1.5 lg:h-[42px] lg:w-[463px] lg:gap-2">
      {timeline.map((t) => (
        <TimelineDays timeline={t} key={t.id} />
      ))}
    </div>
  );
}
