"use client";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { getCoinDataGraph } from "../../redux/features/selectedCoinSlice";
import formatNumber from "../utils/formatNumber";

export default function VolumeChart() {
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
  const [currentVolume, setCurrentVolume] = useState("");
  const [currentDateVolume, setCurrentDateVolume] = useState("");

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
        selectedCoins[0].total_volumes[
          selectedCoins[0].total_volumes.length - 1
        ];
      const lastTotalVolume = lastDataPoint[1];
      const lastDate = new Date(lastDataPoint[0]).toLocaleDateString();

      setCurrentVolume(`${lastTotalVolume.toFixed(2)}`);
      setCurrentDateVolume(lastDate);
    }
  }, [selectedCoins, currencyCode]);

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Error fetching data</div>;
  }

  const coin = selectedCoins.length > 0 ? selectedCoins[0] : null;

  const formattedDataVolume = coin
    ? coin.total_volumes.map(([time, volume]) => ({
        date: new Date(time).toLocaleDateString(),
        volume,
      }))
    : [];

  const handleMouseMoveOnVolume = (e: any) => {
    if (e.activePayload && e.activePayload.length > 0) {
      const { payload } = e.activePayload[0];
      setCurrentVolume(`${payload.volume.toFixed(2)}`);
      setCurrentDateVolume(payload.date);
    }
  };

  return (
    <div className="w-1/2 h-[404px] flex flex-col dark:bg-[#1E1932] bg-white rounded-xl p-6">
      <div className="flex flex-col">
        <span className="text-xl font-normal dark:text-[#D1D1D1] text-[#191932] leading-6">
          Volume 24h
        </span>
        <span className="text-[28px] font-bold leading-7 mt-6">
          {currentVolume
            ? `${currencySimbol}${formatNumber(parseFloat(currentVolume))}`
            : "Fetching..."}
        </span>
        <span className="text-base font-normal dark:text-[#B9B9BA] text-[#424286] leading-6 mt-4">
          {currentDateVolume}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={266}>
        <BarChart
          data={formattedDataVolume}
          onMouseMove={handleMouseMoveOnVolume}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor="#B374F2" />
              <stop offset="100%" stopColor="#9D62D9" />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <Tooltip content={<></>} />
          <Bar dataKey="volume" stroke="" fill="url(#color)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
