'use client';
import { useEffect, useMemo } from 'react';
import { useCurrencyFromUrl } from '../../hooks/useCurrencyFromUrl';
import { useGetGlobalDataQuery } from '../services/api';
import { CoinsIcon } from '../icons/CoinsIcon';
import { ExchangeIcon } from '../icons/ExchangeIcon';
import { ChevronUpIcon } from '../icons/ChevronUpIcon';
import { BitcoinIcon } from '../icons/BitcoinIcon';
import { EthereumIcon } from '../icons/EthereumIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { Progress } from '../components/ui/progress';
import MarketDataHeaderSkeleton from './MarketDataHeaderSkeleton';
import DominanceStat from './DominanceStat';
import formatNumber from '../../app/utils/formatNumber';
import getPercentage from '../../app/utils/getPercentage';
import { handleRtkQueryError } from '../../app/utils/toastErrorHandler';

export default function MarketDataHeader() {
  const { data, isLoading, error } = useGetGlobalDataQuery();
  const { symbol, code } = useCurrencyFromUrl();

  useEffect(() => {
    if (error) {
      handleRtkQueryError(error);
    }
  }, [error]);

  const globalMarketStats = data?.data;

  const marketStats = useMemo(() => {
    if (!globalMarketStats) return null;

    return {
      volumePercentage: getPercentage(
        globalMarketStats.total_volume.btc,
        globalMarketStats.total_market_cap.btc
      ),
      btcDominance: Math.floor(globalMarketStats.market_cap_percentage.btc),
      ethDominance: Math.floor(globalMarketStats.market_cap_percentage.eth),
    };
  }, [globalMarketStats]);

  if (isLoading || error || !globalMarketStats || !marketStats) {
    return <MarketDataHeaderSkeleton />;
  }

  return (
    <div className="mx-auto flex w-full justify-center gap-2 bg-[#353570] px-4 py-5 dark:bg-[#1E1932] sm:gap-7 md:gap-8 lg:px-[72px]">
      <div className="flex items-center gap-1">
        <CoinsIcon />
        <span className="text-xs font-medium text-[#D1D1D1]">Coins</span>
        <span className="text-xs font-medium text-white">
          {globalMarketStats.active_cryptocurrencies}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <ExchangeIcon />
        <span className="text-xs font-medium text-[#D1D1D1]">Exchanges</span>
        <span className="text-xs font-medium text-white">{globalMarketStats.markets}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="hidden text-xs font-medium text-[#D1D1D1] sm:inline">Market Cap</span>
        <div className="flex">
          <span className="text-xs font-medium text-white">{symbol}</span>
          <span className="text-xs font-medium text-white">
            {formatNumber(globalMarketStats.total_market_cap[code])}
          </span>
        </div>

        <span className="hidden sm:block">
          {globalMarketStats.market_cap_change_percentage_24h_usd > 0 ? (
            <ChevronUpIcon />
          ) : (
            <ChevronDownIcon />
          )}
        </span>

        <span
          className={`hidden sm:inline sm:text-xs sm:font-medium ${
            globalMarketStats.market_cap_change_percentage_24h_usd > 0
              ? 'text-[#00F0E2]'
              : 'text-[#FD2263]'
          }`}
        >
          {Math.abs(globalMarketStats.market_cap_change_percentage_24h_usd).toFixed(2)}%
        </span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex">
          <span className="text-xs font-medium text-white">{symbol}</span>
          <span className="text-xs font-medium text-white">
            {formatNumber(globalMarketStats.total_volume[code])}
          </span>
        </div>
        <Progress
          className="hidden sm:block sm:h-[6px] sm:w-[53px] sm:bg-gray-500"
          value={marketStats.volumePercentage}
          indicator="bg-white"
        />
      </div>
      <DominanceStat
        icon={<BitcoinIcon />}
        percentage={marketStats.btcDominance}
        indicatorColor="bg-[#F7931A]"
      />
      <DominanceStat
        icon={<EthereumIcon />}
        percentage={marketStats.ethDominance}
        indicatorColor="bg-[#849DFF]"
      />
    </div>
  );
}
