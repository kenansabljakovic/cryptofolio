import Image from "next/image";
import { useAppSelector } from "../../redux/store";
import { ChevronUpIcon } from "../icons/ChevronUpIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { Progress } from "../components/ui/progress";
import formatNumber from "../../app/utils/formatNumber";
import TableGraph from "./TableGraph";
import { TableCell, TableRow } from "./ui/table";

type Coin = {
  id: string;
  image: string;
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

export default function CoinsMarketStats({
  coin,
  index,
}: CoinsMarketStatsProps) {
  const currencySymbol = useAppSelector(
    (state) => state.currency.currentCurrency.symbol
  );
  return (
    <>
      <tr className="bg-transparent h-2"></tr>
      <TableRow className="dark:bg-[#191925] bg-white border-0">
        <TableCell className="dark:text-white text-[#232336] text-base font-medium leading-6 rounded-tl-xl rounded-bl-xl">
          {index + 1}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-4">
            <Image src={coin.image} alt={coin.id} width={32} height={32} />
            <>
              <span className="dark:text-white text-[#232336] text-base font-medium leading-6">{`${coin.id
                .charAt(0)
                .toUpperCase()}${coin.id.slice(1)}`}</span>{" "}
              <span className="dark:text-white text-[#232336] text-base font-medium leading-6 uppercase">
                ({coin.symbol})
              </span>
            </>
          </div>
        </TableCell>
        <TableCell className="dark:text-white text-[#232336] text-base font-medium leading-6">
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
              className={`text-base font-medium leading-6 ${
                coin.price_change_percentage_1h_in_currency > 0
                  ? "text-[#00F0E2]"
                  : "text-[#FD2263]"
              }`}
            >{`${Math.abs(coin.price_change_percentage_1h_in_currency).toFixed(
              2
            )}%`}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-[6px]">
            {coin.price_change_percentage_24h_in_currency > 0 ? (
              <ChevronUpIcon />
            ) : (
              <ChevronDownIcon />
            )}
            <span
              className={`text-base font-medium leading-6 ${
                coin.price_change_percentage_24h_in_currency > 0
                  ? "text-[#00F0E2]"
                  : "text-[#FD2263]"
              }`}
            >{`${Math.abs(coin.price_change_percentage_24h_in_currency).toFixed(
              2
            )}%`}</span>
          </div>
        </TableCell>
        {/* For some reason I cannot get price_change_percentage_7d_in_currency to work. I am getting undefined.*/}
        <TableCell className="dark:text-white text-[#232336] text-base font-medium leading-6">
          {`${Math.abs(coin?.price_change_percentage_7d_in_currency).toFixed(
            2
          )}%`}
        </TableCell>
        <TableCell className="dark:text-white text-[#232336] text-base font-medium leading-6">
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
            className="w-full h-[6px] bg-gray-500"
            value={(coin.total_volume / coin.market_cap) * 100}
            indicator="bg-[#F7931A]"
          />
        </TableCell>
        <TableCell className="dark:text-white text-[#232336] text-base font-medium leading-6">
          <div className="flex justify-between">
            <span className="text-xs font-normal">
              {formatNumber(coin.circulating_supply)}
            </span>
            <span className="text-xs font-normal">
              {formatNumber(coin.total_supply)}
            </span>
          </div>
          <Progress
            className="w-full h-[6px] bg-gray-500"
            value={(coin.circulating_supply / coin.total_supply) * 100}
            indicator="bg-[#F7931A]"
          />
        </TableCell>
        <TableCell className="dark:text-white text-[#232336] text-base font-medium leading-6 rounded-tr-xl rounded-br-xl">
          <TableGraph sparklineIn7Days={coin.sparkline_in_7d.price} />
        </TableCell>
      </TableRow>
    </>
  );
}
