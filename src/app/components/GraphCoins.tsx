'use client';
import CoinChart from './CoinChart';
import { useAppSelector } from '../../redux/store';

export default function GraphCoins({ selectedCoin }: { selectedCoin: string }) {
  const currencyCode = useAppSelector((state) => state.currency.currentCurrency.code);
  const currencySimbol = useAppSelector((state) => state.currency.currentCurrency.symbol);
  return (
    <div className="flex w-full flex-wrap gap-4 md:flex-nowrap lg:gap-8">
      <CoinChart
        chartType="price"
        currencyCode={currencyCode}
        currencySymbol={currencySimbol}
        selectedCoin={selectedCoin}
      />
      <CoinChart
        chartType="volume"
        currencyCode={currencyCode}
        currencySymbol={currencySimbol}
        selectedCoin={selectedCoin}
      />
    </div>
  );
}
