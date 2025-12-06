import React from 'react';
import { Progress } from './ui/progress';

interface DominanceStatProps {
  icon: React.ReactNode;
  percentage: number;
  indicatorColor: string;
}

const DominanceStat = React.memo(function DominanceStat({
  icon,
  percentage,
  indicatorColor,
}: DominanceStatProps) {
  return (
    <div className="hidden items-center gap-1 lg:flex">
      {icon}
      <span className="text-xs font-medium text-white">{`${percentage}%`}</span>
      <Progress
        className="h-[6px] w-[53px] bg-gray-500"
        value={percentage}
        indicator={indicatorColor}
      />
    </div>
  );
});

DominanceStat.displayName = 'DominanceStat';

export default DominanceStat;
