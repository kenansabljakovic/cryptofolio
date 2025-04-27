'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

type Cryptocurrency = {
  id: string;
  name: string;
};

type SearchResultsListProps = {
  results: Cryptocurrency[];
  selectedIndex: number;
  onCoinClick: (coinId: string) => void;
};

export default function SearchResultsList({
  results,
  selectedIndex,
  onCoinClick,
}: SearchResultsListProps) {
  const resultsRef = useRef<HTMLUListElement>(null);

  return (
    <ul ref={resultsRef}>
      {results.map((coin, index) => (
        <li
          key={coin.id}
          className={`py-2 ${
            index === selectedIndex ? 'rounded-md bg-gray-200 dark:bg-gray-600' : ''
          }`}
        >
          <Link
            href={`/coin/${coin.id}`}
            className="flex items-center gap-4"
            onClick={() => onCoinClick(coin.id)}
          >
            <span className={`${inter.className} pl-2 text-sm leading-[22px]`}>{coin.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
