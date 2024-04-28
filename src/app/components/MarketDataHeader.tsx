"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { getGlobalData } from "../../redux/features/globalSlice";
import { CoinsIcon } from "../icons/CoinsIcon";
import { ExchangeIcon } from "../icons/ExchangeIcon";
import { ChevronUpIcon } from "../icons/ChevronUpIcon";
import { BitcoinIcon } from "../icons/BitcoinIcon";
import { EthereumIcon } from "../icons/EthereumIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { Progress } from "../components/ui/progress";
import MarketDataHeaderSkeleton from "./MarketDataHeaderSkeleton";
import formatNumber from "../../app/utils/formatNumber";
import getPercentage from "../../app/utils/getPercentage";

export default function MarketDataHeader() {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, hasError } = useAppSelector(
    (state) => state.globalData
  );
  const { symbol, code } = useAppSelector(
    (state) => state.currency.currentCurrency
  );

  useEffect(() => {
    dispatch(getGlobalData());
  }, [dispatch, code]);

  if (isLoading || data.active_cryptocurrencies === 0) {
    return <MarketDataHeaderSkeleton />;
  }

  const hasData: boolean = !isLoading && !hasError;
  const percentageVolumeBasedOnTotalMarketCap = getPercentage(
    data.total_volume.btc,
    data.total_market_cap.btc
  );
  const btcMarketCapPercentage = Math.floor(data.market_cap_percentage.btc);
  const ethMarketCapPercentage = Math.floor(data.market_cap_percentage.eth);

  return (
    <div className="w-full mx-auto dark:bg-[#1E1932] bg-[#353570] py-5 px-4 lg:px-[72px] flex gap-2 sm:gap-7 md:gap-8 justify-center">
      {hasData && (
        <>
          <div className="flex items-center gap-1">
            <CoinsIcon />
            <span className="text-[#D1D1D1] text-xs font-medium">Coins</span>
            <span className="text-xs text-white font-medium">
              {data.active_cryptocurrencies}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <ExchangeIcon />
            <span className="text-[#D1D1D1] text-xs font-medium">
              Exchanges
            </span>
            <span className="text-xs text-white font-medium">
              {data.markets}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="hidden sm:inline text-[#D1D1D1] text-xs font-medium">
              Market Cap
            </span>
            <div className="flex">
              <span className="text-xs text-white font-medium">{symbol}</span>
              <span className="text-xs text-white font-medium">
                {formatNumber(data.total_market_cap[code])}
              </span>
            </div>

            <span className="hidden sm:block">
              {data.market_cap_change_percentage_24h_usd > 0 ? (
                <ChevronUpIcon />
              ) : (
                <ChevronDownIcon />
              )}
            </span>

            <span
              className={`hidden sm:inline sm:text-xs sm:font-medium ${
                data.market_cap_change_percentage_24h_usd > 0
                  ? "text-[#00F0E2]"
                  : "text-[#FD2263]"
              }`}
            >
              {Math.abs(data.market_cap_change_percentage_24h_usd).toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex">
              <span className="text-xs text-white font-medium">{symbol}</span>
              <span className="text-xs text-white font-medium">
                {formatNumber(data.total_volume[code])}
              </span>
            </div>
            <Progress
              className="hidden sm:block sm:w-[53px] sm:h-[6px] sm:bg-gray-500"
              value={percentageVolumeBasedOnTotalMarketCap}
              indicator="bg-white"
            />
          </div>
          <div className="hidden lg:flex items-center gap-1">
            <BitcoinIcon />
            <span className="text-xs text-white font-medium">{`${btcMarketCapPercentage}%`}</span>
            <Progress
              className="w-[53px] h-[6px] bg-gray-500"
              value={btcMarketCapPercentage}
              indicator="bg-[#F7931A]"
            />
          </div>
          <div className="hidden lg:flex items-center gap-1">
            <EthereumIcon />
            <span className="text-xs text-white font-medium">{`${ethMarketCapPercentage}%`}</span>
            <Progress
              className="w-[53px] h-[6px] bg-gray-500"
              value={ethMarketCapPercentage}
              indicator="bg-[#849DFF]"
            />
          </div>
        </>
      )}
    </div>
  );
}
