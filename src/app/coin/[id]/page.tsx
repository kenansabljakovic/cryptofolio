"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Progress } from "../../components/ui/progress";
import { AppDispatch, useAppSelector } from "../../../redux/store";
import { getCoinPageData } from "../../../redux/features/coinPageSlice";
import { ChevronUpIcon } from "../../icons/ChevronUpIcon";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
import formatNumber from "../../../app/utils/formatNumber";
import convertToHyperlink from "../../../app/utils/convertToHyperlink";
import HomepageLinks from "../../../app/components/HomePageLinks";
import BlockchainLinks from "../../../app/components/BlockChainLinks";
import { PlusIcon } from "../../icons/PlusIcon";

export default function CoinPage({ params }: { params: { id: string } }) {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, hasError } = useAppSelector(
    (state) => state.coinPageData
  );
  const currencyCode = useAppSelector(
    (state) => state.currency.currentCurrency.code
  );

  const currencySymbol = useAppSelector(
    (state) => state.currency.currentCurrency.symbol
  );

  useEffect(() => {
    dispatch(getCoinPageData({ coin: params.id }));
  }, [dispatch, params.id]);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error loading the data.</div>;

  return (
    <main className="max-w-[1440px] mx-auto xl:px-[72px] lg:px-[36px] px-[24px] mt-5 sm:mt-10 pb-10">
      <div className="w-full flex flex-wrap lg:flex-nowrap gap-5 sm:gap-8">
        <div className="w-full lg:w-1/2 xl:w-5/12 dark:bg-[#1E1932] bg-white rounded-xl py-5 px-4 sm:py-10 sm:px-8">
          <div className="flex items-center gap-2 sm:gap-6">
            <Image
              src={data.image.small}
              alt={data.image.small}
              width={48}
              height={48}
            />
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
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col">
          <div
            className="text-sm font-normal leading-[21px]"
            dangerouslySetInnerHTML={{
              __html: convertToHyperlink(data.description.en),
            }}
          />
          <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
            {data.links.blockchain_site.map(
              (link) =>
                link.length > 0 && <BlockchainLinks key={link} link={link} />
            )}
          </div>
        </div>
      </div>
      <div className="border dark:bg-white bg-black dark:opacity-10 opacity-60 my-6 sm:my-8"></div>
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
              <span className="text-base font-normal leading-5">
                Volume 24h
              </span>
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
              <span className="text-base font-normal leading-5">
                Max Supply
              </span>
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
                  {Math.round(
                    (data.market_data.circulating_supply /
                      data.market_data.max_supply) *
                      100
                  )}
                  %
                </span>
              </div>
              <div className="flex items-center gap-[5px]">
                <span className="w-[6px] h-[6px] bg-[#F8D2A6] rounded-full"></span>
                <span className="text-[#F8D2A6]">
                  {Math.round(
                    100 -
                      (data.market_data.circulating_supply /
                        data.market_data.max_supply) *
                        100
                  )}
                  %
                </span>
              </div>
            </div>
            <Progress
              className="w-full h-[8px] bg-[#F8D2A6]"
              value={
                (data.market_data.circulating_supply /
                  data.market_data.max_supply) *
                100
              }
              indicator="bg-[#D4770C]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 sm:gap-8 dark:bg-[#1E1932] bg-white rounded-xl px-5 py-4 sm:px-10 sm:py-8">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <PlusIcon />
              <span className="text-base font-normal leading-5">
                Market Cap
              </span>
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
    </main>
  );
}
