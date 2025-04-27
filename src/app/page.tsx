'use client';
import NavHome from './components/NavHome';
import CarouselCoins from './components/CarouselCoins';
import GraphCoins from './components/GraphCoins';
import Timeline from './components/Timeline';
import TableCoins from './components/TableCoins';
import { useState, Suspense } from 'react';

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');

  return (
    <main className="pb-10">
      <NavHome />
      <div className="mx-auto mt-5 max-w-[1440px] px-6 sm:mt-10 sm:px-[42px] xl:px-[72px]">
        <CarouselCoins clickedCoin={setSelectedCoin} selectedCoin={selectedCoin} />
      </div>
      <div className="mx-auto mt-4 max-w-[1440px] px-6 sm:mt-10 sm:px-[42px] xl:px-[72px]">
        <Suspense fallback={null}>
          <GraphCoins selectedCoin={selectedCoin} />
        </Suspense>
      </div>
      <div className="mx-auto mt-4 max-w-[1440px] px-6 sm:mt-10 sm:px-[42px] xl:px-[72px]">
        <Suspense fallback={null}>
          <Timeline />
        </Suspense>
      </div>
      <div className="mx-auto mt-4 max-w-[1440px] px-6 sm:mt-10 sm:px-[42px] xl:px-[72px]">
        <TableCoins />
      </div>
    </main>
  );
}
