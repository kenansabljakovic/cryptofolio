"use client";
import { useAppSelector } from "../../redux/store";
import TimelineDays from "./TimelineDays";
export default function Timeline() {
  const timeline = useAppSelector((state) => state.timeline.timeline);

  return (
    <div className="w-full md:w-[400px] lg:w-[463px] lg:h-[42px] dark:bg-[#232336] bg-[#CCCCFA] bg-opacity-40 rounded-md flex gap-1 md:gap-1.5 lg:gap-2 p-1">
      {timeline.map((t) => (
        <TimelineDays timeline={t} key={t.id} />
      ))}
    </div>
  );
}
