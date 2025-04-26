import { PlusIcon } from "../icons/PlusIcon";
import formatNumber from "../../app/utils/formatNumber";
import { Progress } from "../components/ui/progress";
import { CoinInfo } from "../services/api"; // Corrected path

type CoinMetricsProps = {
  data: CoinInfo;
  currencyCode: string;
};

export default function CoinMetrics({ data, currencyCode }: CoinMetricsProps) {
  return (
    <div className="w-full grid lg:grid-cols-2 gap-6 ">
      <div className="flex flex-col gap-6 sm:gap-8 dark:bg-[#1E1932] bg-white rounded-xl px-5 py-4 sm:px-10 sm:py-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <PlusIcon />
            <span className="text-base font-normal leading-5">
              Total Volume
            </span>
          </div>
          <div className="space-x-1">
            <span className="text-base sm:text-xl font-medium leading-[26px]">
              {data.market_data.total_volume[data.symbol] || "N/A"}
            </span>
            <span className="text-base sm:text-xl font-medium leading-[26px] uppercase">
              {data.symbol}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <PlusIcon />
            <span className="text-base font-normal leading-5">Volume 24h</span>
          </div>
          <div className="space-x-1">
            <span className="text-base sm:text-xl font-medium leading-[26px]">
              {formatNumber(data.market_data.total_volume[currencyCode]) ||
                "N/A"}
            </span>
            <span className="text-base sm:text-xl font-medium leading-[26px] uppercase">
              {currencyCode}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <PlusIcon />
            <span className="text-base font-normal leading-5">
              Volume/Market
            </span>
          </div>
          <span className="text-base sm:text-xl font-medium leading-[26px]">
            {(
              data.market_data.total_volume[currencyCode] /
              data.market_data.market_cap[currencyCode]
            ).toFixed(5)}
            %
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-6 sm:gap-8 dark:bg-[#1E1932] bg-white rounded-xl px-5 py-4 sm:px-10 sm:py-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <PlusIcon />
            <span className="text-base font-normal leading-5">Max Supply</span>
          </div>
          <div className="space-x-1">
            <span className="text-base sm:text-xl font-medium leading-[26px]">
              {formatNumber(data.market_data.max_supply) || "N/A"}
            </span>
            <span className="text-base sm:text-xl font-medium leading-[26px] uppercase">
              {data.symbol}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <PlusIcon />
            <span className="text-base font-normal leading-5">
              Circulating Supply
            </span>
          </div>
          <div className="space-x-1">
            <span className="text-base sm:text-xl font-medium leading-[26px]">
              {formatNumber(data.market_data.circulating_supply) || "N/A"}
            </span>
            <span className="text-base sm:text-xl font-medium leading-[26px] uppercase">
              {data.symbol}
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex items-center gap-[5px]">
              <span className="w-[6px] h-[6px] bg-[#D4770C] rounded-full"></span>
              <span className="text-[#D4770C]">
                {data.market_data.max_supply
                  ? Math.round(
                      (data.market_data.circulating_supply /
                        data.market_data.max_supply) *
                        100
                    )
                  : 0} 
                %
              </span>
            </div>
            <div className="flex items-center gap-[5px]">
              <span className="w-[6px] h-[6px] bg-[#F8D2A6] rounded-full"></span>
              <span className="text-[#F8D2A6]">
                {data.market_data.max_supply
                  ? Math.round(
                      100 -
                        (data.market_data.circulating_supply /
                          data.market_data.max_supply) *
                          100
                    )
                  : 100} 
                %
              </span>
            </div>
          </div>
          <Progress
            className="w-full h-[8px] bg-[#F8D2A6]"
            value={
              data.market_data.max_supply
                ? (data.market_data.circulating_supply /
                    data.market_data.max_supply) *
                  100
                : 0
            }
            indicator="bg-[#D4770C]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 sm:gap-8 dark:bg-[#1E1932] bg-white rounded-xl px-5 py-4 sm:px-10 sm:py-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <PlusIcon />
            <span className="text-base font-normal leading-5">Market Cap</span>
          </div>
          <span className="text-base sm:text-xl font-medium leading-[26px]">
            {formatNumber(data.market_data.market_cap[currencyCode])}{" "}
            <span className="text-base sm:text-xl font-medium leading-[26px] uppercase">
              {currencyCode}
            </span>
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <PlusIcon />
            <span className="text-base font-normal leading-5">
              Fully Diluted Valuation
            </span>
          </div>
          <span className="text-base sm:text-xl font-medium leading-[26px]">
            {formatNumber(
              data.market_data.fully_diluted_valuation[currencyCode]
            )}{" "}
            <span className="text-base sm:text-xl font-medium leading-[26px] uppercase">
              {currencyCode}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
