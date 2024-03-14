"use client";
import { useAppSelector } from "../../redux/store";
import TimelineDays from "./TimelineDays";
export default function Timeline() {
  const timeline = useAppSelector((state) => state.timeline.timeline);

  return (
    <div className="w-[463px] h-[42px] dark:bg-[#232336] bg-[#CCCCFA] bg-opacity-40 rounded-md flex gap-2 p-1">
      {timeline.map((t) => (
        <TimelineDays timeline={t} key={t.id} />
      ))}
    </div>
  );
}
