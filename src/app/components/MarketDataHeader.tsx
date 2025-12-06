'use client';
import { useEffect, useMemo } from 'react';
import { useCurrencyFromUrl } from '../../hooks/useCurrencyFromUrl';
import { useGetGlobalDataQuery } from '../services/api';
import { CoinsIcon } from '../icons/CoinsIcon';
import { ExchangeIcon } from '../icons/ExchangeIcon';
import { BitcoinIcon } from '../icons/BitcoinIcon';
import { EthereumIcon } from '../icons/EthereumIcon';
import MarketDataHeaderSkeleton from './MarketDataHeaderSkeleton';
import DominanceStat from './DominanceStat';
import CoinsExchangesStat from './CoinsExchangesStat';
import MarketCapStat from './MarketCapStat';
import VolumeStat from './VolumeStat';
import getPercentage from '../../app/utils/getPercentage';
import { handleRtkQueryError } from '../../app/utils/toastErrorHandler';

// Pre-created icon elements to maintain referential equality
const COINS_ICON = <CoinsIcon />;
const EXCHANGE_ICON = <ExchangeIcon />;
const BITCOIN_ICON = <BitcoinIcon />;
const ETHEREUM_ICON = <EthereumIcon />;

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
      <CoinsExchangesStat
        icon={COINS_ICON}
        label="Coins"
        value={globalMarketStats.active_cryptocurrencies}
      />
      <CoinsExchangesStat
        icon={EXCHANGE_ICON}
        label="Exchanges"
        value={globalMarketStats.markets}
      />
      <MarketCapStat
        symbol={symbol}
        value={globalMarketStats.total_market_cap[code]}
        changePercentage={globalMarketStats.market_cap_change_percentage_24h_usd}
      />
      <VolumeStat
        symbol={symbol}
        value={globalMarketStats.total_volume[code]}
        percentage={marketStats.volumePercentage}
      />
      <DominanceStat
        icon={BITCOIN_ICON}
        percentage={marketStats.btcDominance}
        indicatorColor="bg-[#F7931A]"
      />
      <DominanceStat
        icon={ETHEREUM_ICON}
        percentage={marketStats.ethDominance}
        indicatorColor="bg-[#849DFF]"
      />
    </div>
  );
}
