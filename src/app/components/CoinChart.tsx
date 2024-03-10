"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { getCoinDataGraph } from "../../redux/features/selectedCoinSlice";
import formatNumber from "../utils/formatNumber";

type Payload = {
  date: string;
  value?: number;
  volume?: number;
};

type CoinChartProps = {
  chartType: "price" | "volume";
  currencyCode: string;
  currencySymbol?: string;
};

export default function CoinChart({
  chartType,
  currencyCode,
  currencySymbol,
}: CoinChartProps) {
  const dispatch: AppDispatch = useDispatch();
  const { selectedCoins, loading, hasError } = useAppSelector(
    (state) => state.selectedCoin
  );
  const days = useAppSelector((state) => state.timeline.currentTimeline.days);
  const [currentValue, setCurrentValue] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    dispatch(
      getCoinDataGraph({
        currency: currencyCode,
        days: days,
        coinId: "bitcoin",
      })
    );
  }, [dispatch, currencyCode, days]);

  useEffect(() => {
    if (selectedCoins.length > 0) {
      const lastDataPoint =
        chartType === "price"
          ? selectedCoins[0].prices[selectedCoins[0].prices.length - 1]
          : selectedCoins[0].total_volumes[
              selectedCoins[0].total_volumes.length - 1
            ];
      const lastValue = lastDataPoint[1];
      const lastDate = new Date(lastDataPoint[0]).toLocaleDateString(
        undefined,
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      );

      setCurrentValue(`${lastValue.toFixed(2)}`);
      setCurrentDate(lastDate);
    }
  }, [selectedCoins, chartType, currencyCode]);

  /* if (loading === "pending") {
    return <div>Loading...</div>;
  } */

  if (hasError) {
    return <div>Error fetching data</div>;
  }

  const coin = selectedCoins.length > 0 ? selectedCoins[0] : null;

  const formattedData = coin
    ? chartType === "price"
      ? coin.prices.map(([time, value]) => ({
          date: new Date(time),
          value,
        }))
      : coin.total_volumes.map(([time, volume]) => ({
          date: new Date(time),
          volume,
        }))
    : [];

  const handleMouseMove = (e: { activePayload?: { payload: Payload }[] }) => {
    if (e.activePayload && e.activePayload.length > 0) {
      const { payload } = e.activePayload[0];
      const dataKey = chartType === "price" ? "value" : "volume";
      const value = payload[dataKey]?.toFixed(2) ?? "0";
      const date = new Date(payload.date);
      setCurrentValue(value);
      setCurrentDate(
        date.toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
    }
  };

  const formatDateGraphs = (tick: string): string => {
    const date = new Date(tick);
    let formattedDate: string;

    if (days === "1") {
      formattedDate = date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else if (["7", "14", "30"].includes(days)) {
      formattedDate = date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
      });
    } else if (["90", "180", "365", "max"].includes(days)) {
      formattedDate = date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } else {
      formattedDate = date.toLocaleDateString();
    }

    return formattedDate;
  };

  return (
    <div
      className={`w-full h-[404px] flex flex-col ${
        chartType === "volume" ? "dark:bg-[#1E1932]" : "dark:bg-[#191932]"
      } bg-white rounded-xl p-6`}
    >
      <div className="flex flex-col">
        <span className="text-xl font-normal dark:text-[#D1D1D1] text-[#191932] leading-6">
          {chartType === "volume"
            ? "Volume 24h"
            : `${coin?.id.charAt(0).toUpperCase()}${coin?.id.slice(1)}`}
        </span>
        <span className="text-[28px] font-bold leading-7 mt-6">
          {currentValue
            ? `${currencySymbol}${formatNumber(parseFloat(currentValue))}`
            : "Fetching..."}
        </span>
        <span className="text-base font-normal dark:text-[#B9B9BA] text-[#424286] leading-6 mt-4">
          {currentDate}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={266}>
        {chartType === "volume" ? (
          <BarChart data={formattedData} onMouseMove={handleMouseMove}>
            <defs>
              <linearGradient id="colorBarChart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="1%" stopColor="#B374F2" />
                <stop offset="100%" stopColor="#9D62D9" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={formatDateGraphs}
            />
            <Tooltip content={<></>} />
            <Bar dataKey="volume" stroke="" fill="url(#colorBarChart)" />
          </BarChart>
        ) : (
          <AreaChart data={formattedData} onMouseMove={handleMouseMove}>
            <defs>
              <linearGradient id="colorAreaChart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="1%" stopColor="#7474F2" stopOpacity={0.6} />
                <stop offset="60%" stopColor="#7474F2" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="value"
              stroke="#7878FA"
              strokeWidth="3"
              fill="url(#colorAreaChart)"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={formatDateGraphs}
            />

            <Tooltip content={<></>} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
