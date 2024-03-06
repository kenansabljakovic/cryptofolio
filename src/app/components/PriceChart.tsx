"use client";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { XAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { getCoinDataGraph } from "../../redux/features/selectedCoinSlice";

export default function PriceChart() {
  const dispatch: AppDispatch = useDispatch();
  const { selectedCoins, loading, hasError } = useAppSelector(
    (state) => state.selectedCoin
  );

  const currencyCode = useAppSelector(
    (state) => state.currency.currentCurrency.code
  );
  const currencySimbol = useAppSelector(
    (state) => state.currency.currentCurrency.symbol
  );

  const [currentPriceCoin, setCurrentPriceCoin] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    dispatch(
      getCoinDataGraph({
        currency: currencyCode,
        days: "3",
        coinId: "bitcoin",
      })
    );
  }, [dispatch, currencyCode]);

  useEffect(() => {
    if (selectedCoins.length > 0) {
      const lastDataPoint =
        selectedCoins[0].prices[selectedCoins[0].prices.length - 1];
      const lastPrice = lastDataPoint[1];
      const lastDate = new Date(lastDataPoint[0]).toLocaleDateString();

      setCurrentPriceCoin(`${lastPrice.toFixed(2)}`);
      setCurrentDate(lastDate);
    }
  }, [selectedCoins, currencyCode]);

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Error fetching data</div>;
  }

  const coin = selectedCoins.length > 0 ? selectedCoins[0] : null;

  const formattedData = coin
    ? coin.prices.map(([time, price]) => ({
        date: new Date(time).toLocaleDateString(),
        price,
      }))
    : [];

  const handleMouseMove = (e: any) => {
    if (e.activePayload && e.activePayload.length > 0) {
      const { payload } = e.activePayload[0];
      setCurrentPriceCoin(`${payload.price.toFixed(2)}`);
      setCurrentDate(payload.date);
    }
  };

  return (
    <div className="w-1/2 h-[404px] flex flex-col dark:bg-[#191932] bg-white rounded-xl p-6">
      <div className="flex flex-col">
        <span className="text-xl font-normal dark:text-[#D1D1D1] text-[#191932] leading-6">
          {coin
            ? coin.id.charAt(0).toUpperCase() + coin.id.slice(1)
            : "Loading..."}
        </span>
        <span className="text-[28px] font-bold leading-7 mt-6">
          {currentPriceCoin
            ? `${currencySimbol}${currentPriceCoin}`
            : "Fetching..."}
        </span>
        <span className="text-base font-normal dark:text-[#B9B9BA] text-[#424286] leading-6 mt-4">
          {currentDate}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={266}>
        <AreaChart data={formattedData} onMouseMove={handleMouseMove}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor="#7474F2" stopOpacity={0.6} />
              <stop offset="60%" stopColor="#7474F2" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="price"
            stroke="#7878FA"
            strokeWidth="3"
            fill="url(#color)"
          />

          <XAxis dataKey="date" axisLine={false} tickLine={false} />

          <Tooltip content={<></>} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
