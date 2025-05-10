'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
//import Autoplay from "embla-carousel-autoplay";
import { useGetCoinMarketsQuery } from '../services/api';
import { ChevronUpIcon } from '../icons/ChevronUpIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../components/ui/carousel';
import CarouselCoinsSkeleton from './CarouselCoinsSkeleton';
import { useCurrencyFromUrl } from '@/hooks/useCurrencyFromUrl';

type CarouselCoinsProps = {
  clickedCoin: (value: string) => void;
  selectedCoin: string;
};

export default function CarouselCoins({ clickedCoin, selectedCoin }: CarouselCoinsProps) {
  const { code: currencyCode, symbol: currencySymbol } = useCurrencyFromUrl();

  const { data, isLoading, error } = useGetCoinMarketsQuery(currencyCode);

  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
  }, []);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api.off('reInit', onSelect);
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  if (isLoading || !data || data.length === 0) return <CarouselCoinsSkeleton />;
  if (error) return <div>Error loading the data.</div>;

  const handleCarousel = (coin: string) => {
    clickedCoin(coin);
  };

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1 sm:-ml-2">
        {data?.map((coin) => {
          const coinSelected = selectedCoin === coin.id;
          return (
            <CarouselItem
              key={coin.id}
              className="basis-1/4 pl-1 sm:basis-1/2 sm:pl-2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <button
                onClick={() => handleCarousel(coin.id)}
                className={`${
                  coinSelected
                    ? 'rounded-md border border-[#7878FA] bg-[rgb(120,120,250,0.7)] shadow-md'
                    : 'bg-[rgb(255,255,255)] dark:bg-[#232336] sm:dark:bg-[#191925]'
                } flex w-full cursor-pointer items-center gap-1 rounded-lg p-2 sm:h-[88px] sm:w-full sm:gap-4 sm:px-4`}
              >
                <Image
                  className="size-6 sm:size-8"
                  src={coin.image}
                  alt={coin.name}
                  width={32}
                  height={32}
                />

                <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-0">
                  <div className="text-left text-[16px] font-medium leading-6 text-[#181825] dark:text-white">
                    <span className={`${coinSelected && 'text-white'} hidden sm:inline`}>
                      {coin.name}
                    </span>
                    <span className={`hidden sm:ml-1 sm:inline ${coinSelected && 'text-white'}`}>
                      (
                    </span>
                    <span
                      className={`${
                        coinSelected && 'text-white'
                      } text-sm font-medium uppercase sm:text-base`}
                    >
                      {coin.symbol}
                    </span>
                    <span className={`hidden sm:inline ${coinSelected && 'text-white'}`}>)</span>
                  </div>
                  <div className="hidden sm:flex sm:flex-row sm:items-center sm:gap-2">
                    <span
                      className={`${
                        coinSelected && 'text-white'
                      } text-sm font-normal leading-4 text-[#424286] dark:text-[#D1D1D1]`}
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
                          coin.price_change_percentage_24h < 0 ? 'text-[#FD2263]' : 'text-[#00F0E2]'
                        }`}
                      >
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious
        className={`${!canScrollPrev ? 'hidden' : 'sm:inline-flex'} bg-[#6161D6]/50 hover:bg-[#6161D6]/70 dark:bg-[#6161D6]/50 dark:hover:bg-[#6161D6]`}
      />
      <CarouselNext className="hidden bg-[#6161D6]/50 hover:bg-[#6161D6]/70 dark:bg-[#6161D6]/50 dark:hover:bg-[#6161D6] sm:inline-flex" />
    </Carousel>
  );
}
