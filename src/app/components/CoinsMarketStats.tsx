import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../../redux/store';
import { ChevronUpIcon } from '../icons/ChevronUpIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { Progress } from '../components/ui/progress';
import formatNumber from '../../app/utils/formatNumber';
import TableGraph from './TableGraph';
import { TableCell, TableRow } from './ui/table';

type Coin = {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  sparkline_in_7d: SparklineIn7d;
};

type SparklineIn7d = {
  price: number[];
};

type CoinsMarketStatsProps = {
  coin: Coin;
  index: number;
};

export default function CoinsMarketStats({ coin, index }: CoinsMarketStatsProps) {
  const currencySymbol = useAppSelector((state) => state.currency.currentCurrency.symbol);
  return (
    <>
      <tr className="h-2 bg-transparent"></tr>

      <TableRow className="border-0 bg-white dark:bg-[#191925]">
        <TableCell className="hidden rounded-l-xl text-base font-medium leading-6 text-[#232336] dark:text-white lg:table-cell">
          {index + 1}
        </TableCell>
        <TableCell className="rounded-l-xl lg:rounded-none">
          <div className="flex items-center gap-2 sm:gap-4">
            <Image
              className="size-6 sm:size-8"
              src={coin.image}
              alt={coin.id}
              width={32}
              height={32}
            />
            <Link href={`/coin/${coin.id}`}>
              <div>
                <span className="hidden text-[#232336] dark:text-white lg:inline lg:text-base lg:font-medium lg:leading-6">
                  {coin.name}
                </span>
                <span className="text-sm font-medium uppercase leading-5 text-[#232336] dark:text-white sm:text-base sm:leading-6 lg:ml-1">
                  <span className="hidden sm:ml-1 lg:inline">(</span>
                  {coin.symbol}
                  <span className="hidden lg:inline">)</span>
                </span>
              </div>
            </Link>
          </div>
        </TableCell>
        <TableCell className="text-sm font-medium leading-5 text-[#232336] dark:text-white sm:text-base sm:leading-6">
          {currencySymbol}
          {coin.current_price}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-[6px]">
            {coin.price_change_percentage_1h_in_currency > 0 ? (
              <ChevronUpIcon />
            ) : (
              <ChevronDownIcon />
            )}
            <span
              className={`text-sm font-medium leading-5 sm:text-base sm:leading-6 ${
                coin.price_change_percentage_1h_in_currency > 0
                  ? 'text-[#00F0E2]'
                  : 'text-[#FD2263]'
              }`}
            >{`${Math.abs(coin.price_change_percentage_1h_in_currency).toFixed(2)}%`}</span>
          </div>
        </TableCell>
        <TableCell className="rounded-r-xl sm:rounded-none">
          <div className="flex items-center gap-[6px]">
            {coin.price_change_percentage_24h_in_currency > 0 ? (
              <ChevronUpIcon />
            ) : (
              <ChevronDownIcon />
            )}
            <span
              className={`text-sm font-medium leading-5 sm:text-base sm:leading-6 ${
                coin.price_change_percentage_24h_in_currency > 0
                  ? 'text-[#00F0E2]'
                  : 'text-[#FD2263]'
              }`}
            >{`${Math.abs(coin.price_change_percentage_24h_in_currency).toFixed(2)}%`}</span>
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell sm:rounded-r-xl md:rounded-none">
          <div className="flex items-center gap-[6px]">
            {coin.price_change_percentage_7d_in_currency > 0 ? (
              <ChevronUpIcon />
            ) : (
              <ChevronDownIcon />
            )}
            <span
              className={`text-base font-medium leading-6 ${
                coin.price_change_percentage_7d_in_currency > 0
                  ? 'text-[#00F0E2]'
                  : 'text-[#FD2263]'
              }`}
            >{`${Math.abs(coin.price_change_percentage_7d_in_currency).toFixed(2)}%`}</span>
          </div>
        </TableCell>
        <TableCell className="hidden text-base font-medium leading-6 text-[#232336] dark:text-white md:table-cell md:rounded-r-xl lg:rounded-none">
          <div className="flex justify-between">
            <span className="text-xs font-normal">
              {currencySymbol}
              {formatNumber(coin.total_volume)}
            </span>
            <span className="text-xs font-normal">
              {currencySymbol}
              {formatNumber(coin.market_cap)}
            </span>
          </div>
          <Progress
            className="h-[6px] w-full bg-gray-500"
            value={(coin.total_volume / coin.market_cap) * 100}
            indicator="bg-[#F7931A]"
          />
        </TableCell>
        <TableCell className="hidden text-base font-medium leading-6 text-[#232336] dark:text-white lg:table-cell lg:rounded-r-xl xl:rounded-none">
          <div className="flex justify-between">
            <span className="text-xs font-normal">{formatNumber(coin.circulating_supply)}</span>
            <span className="text-xs font-normal">{formatNumber(coin.total_supply)}</span>
          </div>
          <Progress
            className="h-[6px] w-full bg-gray-500"
            value={(coin.circulating_supply / coin.total_supply) * 100}
            indicator="bg-[#F7931A]"
          />
        </TableCell>
        <TableCell className="hidden rounded-r-xl text-base font-medium leading-6 text-[#232336] dark:text-white xl:table-cell">
          <TableGraph graphId={coin.id} sparklineIn7Days={coin.sparkline_in_7d.price} />
        </TableCell>
      </TableRow>
    </>
  );
}
