import React from 'react';
import { ChevronUpIcon } from '../icons/ChevronUpIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import formatNumber from '../../app/utils/formatNumber';

interface MarketCapStatProps {
  symbol: string;
  value: number;
  changePercentage: number;
}

const MarketCapStat = React.memo(function MarketCapStat({
  symbol,
  value,
  changePercentage,
}: MarketCapStatProps) {
  const isPositive = changePercentage > 0;

  return (
    <div className="flex items-center gap-1">
      <span className="hidden text-xs font-medium text-[#D1D1D1] sm:inline">Market Cap</span>
      <div className="flex">
        <span className="text-xs font-medium text-white">{symbol}</span>
        <span className="text-xs font-medium text-white">{formatNumber(value)}</span>
      </div>

      <span className="hidden sm:block">
        {isPositive ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </span>

      <span
        className={`hidden sm:inline sm:text-xs sm:font-medium ${
          isPositive ? 'text-[#00F0E2]' : 'text-[#FD2263]'
        }`}
      >
        {Math.abs(changePercentage).toFixed(2)}%
      </span>
    </div>
  );
});

MarketCapStat.displayName = 'MarketCapStat';

export default MarketCapStat;
