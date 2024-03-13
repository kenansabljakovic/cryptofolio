import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { activeTimeline } from "../../redux/features/timelineSlice";
import { TimelineItem } from "../../redux/features/timelineSlice";

type TimelineDaysProps = {
  timeline: TimelineItem;
};

export default function TimelineDays({ timeline }: TimelineDaysProps) {
  const dispatch: AppDispatch = useDispatch();

  return (
    <button
      className={`w-14 p-1 ${
        timeline.active
          ? "bg-[rgb(120,120,250,0.7)] border border-[#7878FA] shadow-md rounded-md"
          : ""
      }`}
      onClick={() => dispatch(activeTimeline(timeline.id))}
      key={timeline.id}
    >
      <span className="dark:text-[#E4E4F0] text-[#181825] text-sm">
        {timeline.display}
      </span>
    </button>
  );
}
