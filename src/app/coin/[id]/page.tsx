'use client';
import { useAppSelector } from '../../../redux/store';
import { useGetCoinPageInfoQuery } from '../../../app/services/api';
import CoinPageSkeleton from '../../../app/components/CoinPageSkeleton';
import CoinPriceInfo from '../../../app/components/CoinPriceInfo';
import CoinDescriptionLinks from '../../../app/components/CoinDescriptionLinks';
import CoinMetrics from '../../../app/components/CoinMetrics';

type CoinPageProps = {
  params: {
    id: string;
  };
};

export default function CoinPage({ params }: CoinPageProps) {
  const { data, isLoading, error } = useGetCoinPageInfoQuery(params.id);
  const currencyCode = useAppSelector((state) => state.currency.currentCurrency.code);
  const currencySymbol = useAppSelector((state) => state.currency.currentCurrency.symbol);

  if (isLoading || !data) return <CoinPageSkeleton />;
  if (error) {
    console.error('Error loading coin page data:', error);
    return <div>Error loading the data.</div>;
  }

  return (
    <main className="mx-auto mt-5 max-w-[1440px] px-[24px] pb-10 sm:mt-10 lg:px-[36px] xl:px-[72px]">
      <div className="flex w-full flex-wrap gap-5 sm:gap-8 lg:flex-nowrap">
        <CoinPriceInfo data={data} currencyCode={currencyCode} currencySymbol={currencySymbol} />
        <CoinDescriptionLinks data={data} />
      </div>
      <div className="my-6 border bg-black opacity-60 dark:bg-white dark:opacity-10 sm:my-8"></div>
      <CoinMetrics data={data} currencyCode={currencyCode} />
    </main>
  );
}
