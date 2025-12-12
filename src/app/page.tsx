'use client';
import NavHome from './components/NavHome';
import NavHomeSkeleton from './components/NavHomeSkeleton';
import CarouselCoins from './components/CarouselCoins';
import GraphCoins from './components/GraphCoins';
import PriceChartSkeleton from './components/PriceChartSkeleton';
import VolumeChartSkeleton from './components/VolumeChartSkeleton';
import Timeline from './components/Timeline';
import TimelineSkeleton from './components/TimelineSkeleton';
import TableCoins from './components/TableCoins';
import TableCoinsSkeleton from './components/TableCoinsSkeleton';
import { Suspense } from 'react';
import { useSelectedCoinFromUrl } from '@/hooks/useSelectedCoinFromUrl';

export default function Home() {
  const { selectedCoin, setSelectedCoin } = useSelectedCoinFromUrl();

  return (
    <main className="pb-0 sm:pb-10">
      <Suspense fallback={<NavHomeSkeleton />}>
        <NavHome />
      </Suspense>
      <div className="mx-auto mt-5 max-w-[1440px] px-6 sm:mt-10 sm:px-[42px] xl:px-[72px]">
        <CarouselCoins clickedCoin={setSelectedCoin} selectedCoin={selectedCoin} />
      </div>
      <div className="mx-auto mt-4 max-w-[1440px] px-6 sm:mt-10 sm:px-[42px] xl:px-[72px]">
        <Suspense
          fallback={
            <div className="flex w-full flex-wrap gap-4 md:flex-nowrap lg:gap-8">
              <PriceChartSkeleton />
              <VolumeChartSkeleton />
            </div>
          }
        >
          <GraphCoins selectedCoin={selectedCoin} />
        </Suspense>
      </div>
      <div className="mx-auto mt-4 max-w-[1440px] px-6 sm:mt-10 sm:px-[42px] xl:px-[72px]">
        <Suspense fallback={<TimelineSkeleton />}>
          <Timeline />
        </Suspense>
      </div>
      <div className="mx-auto mt-4 max-w-[1440px] px-6 sm:mt-10 sm:px-[42px] xl:px-[72px]">
        <Suspense fallback={<TableCoinsSkeleton />}>
          <TableCoins />
        </Suspense>
      </div>
    </main>
  );
}
