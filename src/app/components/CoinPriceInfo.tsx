import Image from 'next/image';
import HomepageLinks from './HomePageLinks';
import { ChevronUpIcon } from '../icons/ChevronUpIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { CoinInfo } from '../services/api';

type CoinPriceInfoProps = {
  data: CoinInfo;
  currencySymbol: string;
  currencyCode: string;
};

export default function CoinPriceInfo({ data, currencySymbol, currencyCode }: CoinPriceInfoProps) {
  return (
    <div className="w-full rounded-xl bg-white px-4 py-5 dark:bg-[#1E1932] sm:px-8 sm:py-10 lg:w-1/2 xl:w-5/12">
      <div className="flex items-center gap-2 sm:gap-6">
        <Image src={data.image.small} alt={data.name} width={48} height={48} />
        <div>
          <div className="space-x-1">
            <span className="text-lg font-bold text-[#191932] dark:text-white sm:text-2xl">
              {data.name || 'N/A'}
            </span>
            <span className="text-lg uppercase text-[#191932] dark:text-white sm:text-2xl">
              ({data.symbol || 'N/A'})
            </span>
          </div>
          {data.links.homepage.map(
            (link: string) => link.length > 0 && <HomepageLinks key={link} link={link} />
          )}
        </div>
      </div>
      <div className="mt-7 flex items-end gap-4 sm:mt-12">
        <span className="text-2xl sm:text-4xl">
          {currencySymbol}
          {data.market_data.current_price[currencyCode] || 'N/A'}
        </span>
        <div className="flex items-center gap-1">
          <span>
            {data.market_data.price_change_percentage_24h_in_currency[currencyCode] > 0 ? (
              <ChevronUpIcon />
            ) : (
              <ChevronDownIcon />
            )}
          </span>
          <span
            className={`text-base font-medium leading-6 sm:text-xl ${
              data.market_data.price_change_percentage_24h_in_currency[currencyCode] > 0
                ? 'text-[#01F1E3]'
                : 'text-[#FD2263]'
            }`}
          >
            {Math.abs(
              data.market_data.price_change_percentage_24h_in_currency[currencyCode]
            ).toFixed(2) || 'N/A'}
            %
          </span>
        </div>
      </div>
      <div className="mt-5 border bg-black opacity-60 dark:bg-white dark:opacity-10 sm:mt-8"></div>

      <div className="mt-5 flex gap-4 sm:mt-8">
        <div className="mt-2">
          <ChevronUpIcon />
        </div>
        <div className="w-full">
          <div className="flex w-full justify-between">
            <span className="text-base font-normal sm:text-xl">All time high:</span>
            <span className="text-lg font-medium leading-6 sm:text-2xl">
              {currencySymbol}
              {data.market_data.ath[currencyCode] || 'N/A'}
            </span>
          </div>
          <span className="text-sm font-normal text-black dark:text-[#B9B9BA] sm:text-base">
            {data.market_data.ath_date[currencyCode] || 'N/A'}
          </span>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <div className="mt-2">
          <ChevronDownIcon />
        </div>
        <div className="w-full">
          <div className="flex w-full justify-between">
            <span className="text-base font-medium leading-6 sm:text-xl">All time low:</span>
            <span className="text-lg font-medium leading-6 sm:text-2xl">
              {currencySymbol}
              {data.market_data.atl[currencyCode] || 'N/A'}
            </span>
          </div>
          <span className="text-sm font-normal text-black dark:text-[#B9B9BA] sm:text-base">
            {data.market_data.atl_date[currencyCode] || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}
