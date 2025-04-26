"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  YAxis,
} from "recharts";
import { useAppSelector } from "../../redux/store";
import { useGetCoinMarketChartQuery, useGetCoinDetailsQuery } from "../services/api";
import formatNumber from "../utils/formatNumber";
import formatDateGraphs from "../utils/formatDateGraph";
import PriceChartSkeleton from "./PriceChartSkeleton";
import VolumeChartSkeleton from "./VolumeChartSkeleton";

type Payload = {
  date: string;
  value?: number;
  volume?: number;
};

type CoinChartProps = {
  chartType: "price" | "volume";
  currencyCode: string;
  currencySymbol?: string;
  selectedCoin: string;
};

export default function CoinChart({
  chartType,
  currencyCode,
  currencySymbol,
  selectedCoin,
}: CoinChartProps) {
  const days = useAppSelector((state) => state.timeline.currentTimeline.days);
  const [currentValue, setCurrentValue] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // Create a wrapper function for formatDateGraphs to match Recharts' expected signature
  const formatTick = (value: any) => formatDateGraphs(value, days);

  // Use RTK Query hooks instead of dispatching actions
  const { data: chartData, isLoading, error } = useGetCoinMarketChartQuery({
    coinId: selectedCoin,
    currency: currencyCode,
    days: days
  });

  // Get coin details (only for price charts)
  const { data: coinDetails } = useGetCoinDetailsQuery(selectedCoin, {
    skip: chartType === "volume" // Skip this request for volume charts
  });

  useEffect(() => {
    if (chartData) {
      const lastDataPoint =
        chartType === "price"
          ? chartData.prices[chartData.prices.length - 1]
          : chartData.total_volumes[
              chartData.total_volumes.length - 1
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
  }, [chartData, chartType, currencyCode]);

  // Show loading state while data is being fetched
  if (isLoading || !chartData || (chartType === "price" && !coinDetails)) {
    return (
      <div className="w-full flex flex-wrap md:flex-nowrap gap-4 lg:gap-8">
        {chartType === "price" ? (
          <PriceChartSkeleton />
        ) : (
          <VolumeChartSkeleton />
        )}
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const coin = chartData;

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

  return (
    <div
      className={`w-full flex flex-col ${
        chartType === "volume" ? "dark:bg-[#1E1932]" : "dark:bg-[#191932]"
      } bg-white rounded-xl pt-4 lg:pt-6 pb-1 lg:pb-3 px-4 lg:px-6`}
    >
      <div className="flex flex-col">
        <div>
          {chartType === "volume" ? (
            <span className="text-base leading-5 sm:text-xl font-normal dark:text-[#D1D1D1] text-[#191932] sm:leading-6">
              {coin?.id && "Volume 24h"}
            </span>
          ) : (
            <>
              <span className="text-base leading-5 sm:text-xl font-normal dark:text-[#D1D1D1] text-[#191932] sm:leading-6 capitalize">
                {coinDetails?.name}
              </span>
              <span className="ml-1 text-base leading-5 sm:text-xl font-normal dark:text-[#D1D1D1] text-[#191932] sm:leading-6 uppercase">
                ({coinDetails?.symbol})
              </span>
            </>
          )}
        </div>
        <span className="text-xl sm:text-[28px] font-medium sm:font-bold leading-7 mt-3 sm:mt-6">
          {currentValue &&
            `${currencySymbol}${formatNumber(parseFloat(currentValue))}`}
        </span>
        <span className="text-xs leading-4 mt-2 sm:text-base font-normal dark:text-[#B9B9BA] text-[#424286] sm:leading-6 sm:mt-4">
          {currentDate}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={266}>
        {chartType === "volume" ? (
          <BarChart 
            data={formattedData} 
            onMouseMove={handleMouseMove}
          >
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
              tickFormatter={formatTick}
              interval="preserveStartEnd"
              tickMargin={5}
            />
            <Tooltip content={<></>} />
            <Bar dataKey="volume" stroke="" fill="url(#colorBarChart)" />
          </BarChart>
        ) : (
          <AreaChart 
            data={formattedData} 
            onMouseMove={handleMouseMove}
          >
            <defs>
              <linearGradient id="colorAreaChart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="1%" stopColor="#7474F2" stopOpacity={0.6} />
                <stop offset="60%" stopColor="#7474F2" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={formatTick}
              interval="preserveStartEnd"
              tickMargin={5}
            />
            <YAxis hide={true} domain={["dataMin", "dataMax"]} />
            <Tooltip content={<></>} />
            <Area
              dataKey="value"
              stroke="#7878FA"
              strokeWidth={3}
              fill="url(#colorAreaChart)"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}