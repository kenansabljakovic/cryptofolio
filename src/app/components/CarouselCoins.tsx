"use client";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
//import Autoplay from "embla-carousel-autoplay";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { getCoinData } from "../../redux/features/coinInfoSlice";
import { ChevronUpIcon } from "../icons/ChevronUpIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

type CarouselCoinsProps = {
  clickedCoin: (value: string) => void;
  selectedCoin: string;
};

export default function CarouselCoins({
  clickedCoin,
  selectedCoin,
}: CarouselCoinsProps) {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, hasError } = useAppSelector(
    (state) => state.coinData
  );
  const currencyCode = useAppSelector(
    (state) => state.currency.currentCurrency.code
  );

  const currencySymbol = useAppSelector(
    (state) => state.currency.currentCurrency.symbol
  );

  useEffect(() => {
    dispatch(getCoinData(currencyCode));
  }, [dispatch, currencyCode]);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error loading the data.</div>;

  const handleCarousel = (coin: string) => {
    clickedCoin(coin);
  };
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      //Will see if I need this feature (carousel autoplay)
      /* plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]} */
      className="w-full"
    >
      <CarouselContent className="-ml-1 sm:-ml-2">
        {data?.map((coin) => (
          <CarouselItem
            key={coin.id}
            className="pl-1 basis-1/4 sm:basis-1/2 sm:pl-2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <button
              onClick={() => handleCarousel(coin.id)}
              className={`${
                selectedCoin === coin.id
                  ? "bg-[rgb(120,120,250,0.7)] border border-[#7878FA] shadow-md rounded-md"
                  : "dark:bg-[#232336] sm:dark:bg-[#191925] bg-[rgb(255,255,255)]"
              } px-2 py-2 w-full sm:h-[88px] sm:w-full flex items-center gap-1 sm:gap-4 rounded-lg cursor-pointer sm:px-4`}
            >
              <Image
                className="w-6 h-6 sm:w-8 sm:h-8"
                src={coin.image}
                alt={coin.name}
                width={32}
                height={32}
              />

              <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0">
                <div className="text-[16px] dark:text-white text-[#181825] font-medium leading-6 text-left">
                  <span
                    className={`${
                      selectedCoin === coin.id && "text-white"
                    } hidden sm:inline`}
                  >
                    {coin.name}
                  </span>
                  <span
                    className={`hidden sm:inline sm:ml-1 ${
                      selectedCoin === coin.id && "text-white"
                    }`}
                  >
                    (
                  </span>
                  <span
                    className={`${
                      selectedCoin === coin.id && "text-white"
                    } uppercase text-sm font-medium sm:text-base`}
                  >
                    {coin.symbol}
                  </span>
                  <span
                    className={`hidden sm:inline ${
                      selectedCoin === coin.id && "text-white"
                    }`}
                  >
                    )
                  </span>
                </div>
                <div className="hidden sm:flex sm:flex-row sm:items-center sm:gap-2">
                  <span
                    className={`${
                      selectedCoin === coin.id && "text-white"
                    } dark:text-[#D1D1D1] text-[#424286] text-sm font-normal leading-4`}
                  >
                    {currencySymbol}
                    {coin.current_price}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="">
                      {coin.price_change_percentage_24h > 0 ? (
                        <ChevronUpIcon />
                      ) : (
                        <ChevronDownIcon />
                      )}
                    </span>
                    <span
                      className={`text-sm font-normal ${
                        coin.price_change_percentage_24h < 0
                          ? "text-[#FD2263]"
                          : "text-[#00F0E2]"
                      }`}
                    >
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden dark:bg-[#6161D6] dark:bg-opacity-50 bg-[#6161D6] bg-opacity-50 dark:hover:bg-[#6161D6] hover:bg-[#6161D6] hover:bg-opacity-70" />
      <CarouselNext className="hidden sm:inline-flex dark:bg-[#6161D6] dark:bg-opacity-50 bg-[#6161D6] bg-opacity-50 dark:hover:bg-[#6161D6] hover:bg-[#6161D6] hover:bg-opacity-70" />
    </Carousel>
  );
}
