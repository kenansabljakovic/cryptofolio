"use client";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { activeTimeline } from "../../redux/features/timelineSlice";

export default function Timeline() {
  const dispatch: AppDispatch = useDispatch();
  const timeline = useAppSelector((state) => state.timeline.timeline);

  return (
    <div className="w-[463px] h-[42px] dark:bg-[#232336] bg-[#CCCCFA] bg-opacity-40 rounded-md flex gap-2 p-1">
      {timeline.map((t) => (
        <button
          className={`w-14 p-1 ${
            t.active
              ? "bg-[rgb(120,120,250,0.7)] border border-[#7878FA] shadow-md rounded-md"
              : ""
          }`}
          onClick={() => dispatch(activeTimeline(t.id))}
          key={t.id}
        >
          <span className="dark:text-[#E4E4F0] text-[#181825] text-sm">
            {t.display}
          </span>
        </button>
      ))}
    </div>
  );
}
