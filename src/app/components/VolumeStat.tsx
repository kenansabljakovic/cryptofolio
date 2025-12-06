import React from 'react';
import { Progress } from './ui/progress';
import formatNumber from '../../app/utils/formatNumber';

interface VolumeStatProps {
  symbol: string;
  value: number;
  percentage: number;
}

const VolumeStat = React.memo(function VolumeStat({
  symbol,
  value,
  percentage,
}: VolumeStatProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        <span className="text-xs font-medium text-white">{symbol}</span>
        <span className="text-xs font-medium text-white">{formatNumber(value)}</span>
      </div>
      <Progress
        className="hidden sm:block sm:h-[6px] sm:w-[53px] sm:bg-gray-500"
        value={percentage}
        indicator="bg-white"
      />
    </div>
  );
});

VolumeStat.displayName = 'VolumeStat';

export default VolumeStat;
