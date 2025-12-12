'use client';
import { useEffect } from 'react';
import { useCurrencyFromUrl } from '@/hooks/useCurrencyFromUrl';
import { useGetCoinPageInfoQuery } from '../../../app/services/api';
import CoinPageSkeleton from '../../../app/components/CoinPageSkeleton';
import CoinPriceInfo from '../../../app/components/CoinPriceInfo';
import CoinDescriptionLinks from '../../../app/components/CoinDescriptionLinks';
import CoinMetrics from '../../../app/components/CoinMetrics';
import { handleRtkQueryError } from '@/app/utils/toastErrorHandler';

type CoinPageProps = {
  params: {
    id: string;
  };
};

export default function CoinPage({ params }: CoinPageProps) {
  const { data, isLoading, error } = useGetCoinPageInfoQuery(params.id);
  const { code: currencyCode, symbol: currencySymbol } = useCurrencyFromUrl();

  useEffect(() => {
    if (error) {
      handleRtkQueryError(error);
    }
  }, [error]);

  if (isLoading || !data) return <CoinPageSkeleton />;
  if (error) return <CoinPageSkeleton />;

  return (
    <main className="mx-auto mt-5 max-w-[1440px] px-[24px] pb-0 sm:mt-10 sm:pb-10 lg:px-[36px] xl:px-[72px]">
      <div className="flex w-full flex-wrap gap-5 sm:gap-8 lg:flex-nowrap">
        <CoinPriceInfo data={data} currencyCode={currencyCode} currencySymbol={currencySymbol} />
        <CoinDescriptionLinks data={data} />
      </div>
      <div className="my-6 border bg-black opacity-60 dark:bg-white dark:opacity-10 sm:my-8"></div>
      <CoinMetrics data={data} currencyCode={currencyCode} />
    </main>
  );
}
