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
  YAxis,
} from "recharts";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { getCoinDataGraph } from "../../redux/features/selectedCoinSlice";
import formatNumber from "../utils/formatNumber";
import formatDateGraphs from "../utils/formatDateGraph";

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
  const dispatch: AppDispatch = useDispatch();
  const { selectedCoins, hasError } = useAppSelector(
    (state) => state.selectedCoin
  );
  const { data } = useAppSelector((state) => state.coinData);
  const days = useAppSelector((state) => state.timeline.currentTimeline.days);
  const [currentValue, setCurrentValue] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    dispatch(
      getCoinDataGraph({
        currency: currencyCode,
        days: days,
        coinId: selectedCoin,
      })
    );
  }, [dispatch, currencyCode, days, selectedCoin]);

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
                {data.find((c) => c.id === coin?.id)?.name}
              </span>
              <span className="ml-1 text-base leading-5 sm:text-xl font-normal dark:text-[#D1D1D1] text-[#191932] sm:leading-6 uppercase">
                ({data.find((c) => c.id === coin?.id)?.symbol})
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
              tickFormatter={(tick) => formatDateGraphs(tick, days)}
              interval="preserveStartEnd"
              tickMargin={5}
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
            <YAxis hide={true} domain={["dataMin", "dataMax"]} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(tick) => formatDateGraphs(tick, days)}
              interval="preserveStartEnd"
              tickMargin={5}
            />

            <Tooltip content={<></>} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
