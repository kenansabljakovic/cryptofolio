'use client';
import CoinChart from './CoinChart';
import { useCurrencyFromUrl } from '@/hooks/useCurrencyFromUrl';

export default function GraphCoins({ selectedCoin }: { selectedCoin: string }) {
  const { code: currencyCode, symbol: currencySymbol } = useCurrencyFromUrl();
  return (
    <div
      className="flex w-full flex-wrap gap-4 md:flex-nowrap lg:gap-8"
      data-testid="graph-container"
    >
      <CoinChart
        chartType="price"
        currencyCode={currencyCode}
        currencySymbol={currencySymbol}
        selectedCoin={selectedCoin}
      />
      <CoinChart
        chartType="volume"
        currencyCode={currencyCode}
        currencySymbol={currencySymbol}
        selectedCoin={selectedCoin}
      />
    </div>
  );
}
