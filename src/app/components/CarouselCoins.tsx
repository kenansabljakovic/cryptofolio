"use client";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
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

export default function CarouselCoins() {
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
    //implement in next PR
  };
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {data.map((coin) => (
          <CarouselItem
            key={coin.id}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <button
              onClick={() => handleCarousel(coin.id)}
              className="h-[88px] w-full dark:bg-[#191925] bg-[rgb(255,255,255)] flex items-center gap-4 rounded-lg cursor-pointer px-4"
            >
              <Image src={coin.image} alt={coin.name} width={32} height={32} />

              <div className="flex flex-col">
                <h2 className="text-[16px] dark:text-white text-[#181825] font-medium leading-6 text-left">
                  {coin.name} ({coin.symbol.toUpperCase()})
                </h2>
                <div className="flex items-center gap-2">
                  <span className="dark:text-[#D1D1D1] text-[#424286] text-sm font-normal leading-4">
                    {currencySymbol}
                    {coin.current_price}
                  </span>
                  {coin.price_change_percentage_24h > 0 ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )}
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
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="dark:bg-[#6161D6] dark:bg-opacity-50 bg-[#6161D6] bg-opacity-50 dark:hover:bg-[#6161D6] hover:bg-[#6161D6] hover:bg-opacity-70" />
      <CarouselNext className="dark:bg-[#6161D6] dark:bg-opacity-50 bg-[#6161D6] bg-opacity-50 dark:hover:bg-[#6161D6] hover:bg-[#6161D6] hover:bg-opacity-70" />
    </Carousel>
  );
}
