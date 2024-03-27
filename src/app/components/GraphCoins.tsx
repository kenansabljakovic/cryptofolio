"use client";
import CoinChart from "./CoinChart";
import { useAppSelector } from "../../redux/store";

export default function GraphCoins() {
  const currencyCode = useAppSelector(
    (state) => state.currency.currentCurrency.code
  );
  const currencySimbol = useAppSelector(
    (state) => state.currency.currentCurrency.symbol
  );
  return (
    <div className="w-full flex flex-wrap md:flex-nowrap gap-4 lg:gap-8">
      <CoinChart
        chartType="price"
        currencyCode={currencyCode}
        currencySymbol={currencySimbol}
      />
      <CoinChart
        chartType="volume"
        currencyCode={currencyCode}
        currencySymbol={currencySimbol}
      />
    </div>
  );
}
