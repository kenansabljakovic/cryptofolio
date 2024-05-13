import Image from "next/image";
import HomepageLinks from "./HomePageLinks";
import { ChevronUpIcon } from "../icons/ChevronUpIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";

type Coin = {
  [key: string]: number;
};

type TimeStamp = {
  [key: string]: string;
};

type MarketData = {
  current_price: Coin;
  price_change_percentage_24h_in_currency: Coin;
  ath: Coin;
  ath_date: TimeStamp;
  atl: Coin;
  atl_date: TimeStamp;
};

type CoinInfo = {
  symbol: string;
  name: string;
  image: { [name: string]: string };
  links: { homepage: string[] };
  market_data: MarketData;
};

type CoinPriceInfoProps = {
  data: CoinInfo;
  currencySymbol: string;
  currencyCode: string;
};

export default function CoinPriceInfo({
  data,
  currencySymbol,
  currencyCode,
}: CoinPriceInfoProps) {
  return (
    <div className="w-full lg:w-1/2 xl:w-5/12 dark:bg-[#1E1932] bg-white rounded-xl py-5 px-4 sm:py-10 sm:px-8">
      <div className="flex items-center gap-2 sm:gap-6">
        <Image src={data.image.small} alt={data.name} width={48} height={48} />
        <div>
          <div className="space-x-1">
            <span className="text-lg sm:text-2xl font-bold dark:text-white text-[#191932]">
              {data.name || "N/A"}
            </span>
            <span className="text-lg sm:text-2xl dark:text-white text-[#191932] uppercase">
              ({data.symbol || "N/A"})
            </span>
          </div>
          {data.links.homepage.map(
            (link: string) =>
              link.length > 0 && <HomepageLinks key={link} link={link} />
          )}
        </div>
      </div>
      <div className="mt-7 sm:mt-12 flex gap-4 items-end">
        <span className="text-2xl sm:text-4xl">
          {currencySymbol}
          {data.market_data.current_price[currencyCode] || "N/A"}
        </span>
        <div className="flex items-center gap-1">
          <span>
            {data.market_data.price_change_percentage_24h_in_currency[
              currencyCode
            ] > 0 ? (
              <ChevronUpIcon />
            ) : (
              <ChevronDownIcon />
            )}
          </span>
          <span
            className={`text-base sm:text-xl leading-6 font-medium ${
              data.market_data.price_change_percentage_24h_in_currency[
                currencyCode
              ] > 0
                ? "text-[#01F1E3]"
                : "text-[#FD2263]"
            }`}
          >
            {Math.abs(
              data.market_data.price_change_percentage_24h_in_currency[
                currencyCode
              ]
            ).toFixed(2) || "N/A"}
            %
          </span>
        </div>
      </div>
      <div className="mt-5 sm:mt-8 border dark:bg-white bg-black dark:opacity-10 opacity-60"></div>

      <div className="mt-5 sm:mt-8 flex gap-4">
        <div className="mt-2">
          <ChevronUpIcon />
        </div>
        <div className="w-full">
          <div className="w-full flex justify-between">
            <span className="text-base sm:text-xl font-normal">
              All time high:
            </span>
            <span className="text-lg sm:text-2xl leading-6 font-medium ">
              {currencySymbol}
              {data.market_data.ath[currencyCode] || "N/A"}
            </span>
          </div>
          <span className="text-sm sm:text-base font-normal dark:text-[#B9B9BA] text-black">
            {data.market_data.ath_date[currencyCode] || "N/A"}
          </span>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <div className="mt-2">
          <ChevronDownIcon />
        </div>
        <div className="w-full">
          <div className="w-full flex justify-between">
            <span className="text-base sm:text-xl leading-6 font-medium">
              All time low:
            </span>
            <span className="text-lg sm:text-2xl leading-6 font-medium ">
              {currencySymbol}
              {data.market_data.atl[currencyCode] || "N/A"}
            </span>
          </div>
          <span className="text-sm sm:text-base font-normal dark:text-[#B9B9BA] text-black">
            {data.market_data.atl_date[currencyCode] || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
