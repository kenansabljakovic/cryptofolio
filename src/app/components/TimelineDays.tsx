import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { activeTimeline } from '../../redux/features/timelineSlice';
import { TimelineItem } from '../../redux/features/timelineSlice';

type TimelineDaysProps = {
  timeline: TimelineItem;
};

export default function TimelineDays({ timeline }: TimelineDaysProps) {
  const dispatch: AppDispatch = useDispatch();

  return (
    <button
      className={`w-14 p-1 ${
        timeline.active
          ? 'rounded-md border border-[#7878FA] bg-[rgb(120,120,250,0.7)] shadow-md'
          : ''
      }`}
      onClick={() => dispatch(activeTimeline(timeline.id))}
      key={timeline.id}
    >
      <span className="text-sm text-[#181825] dark:text-[#E4E4F0]">{timeline.display}</span>
    </button>
  );
}
