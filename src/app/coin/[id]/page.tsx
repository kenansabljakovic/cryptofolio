"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../redux/store";
import { getCoinPageData } from "../../../redux/features/coinPageSlice";
import CoinPriceInfo from "@/app/components/CoinPriceInfo";
import CoinDescriptionLinks from "@/app/components/CoinDescriptionLinks";
import CoinMetrics from "@/app/components/CoinMetrics";

type CoinPageProps = {
  params: {
    id: string;
  };
};

export default function CoinPage({ params }: CoinPageProps) {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, hasError } = useAppSelector(
    (state) => state.coinPageData
  );
  const currencyCode = useAppSelector(
    (state) => state.currency.currentCurrency.code
  );

  const currencySymbol = useAppSelector(
    (state) => state.currency.currentCurrency.symbol
  );

  useEffect(() => {
    dispatch(getCoinPageData({ coin: params.id }));
  }, [dispatch, params.id]);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error loading the data.</div>;

  return (
    <main className="max-w-[1440px] mx-auto xl:px-[72px] lg:px-[36px] px-[24px] mt-5 sm:mt-10 pb-10">
      <div className="w-full flex flex-wrap lg:flex-nowrap gap-5 sm:gap-8">
        <CoinPriceInfo
          data={data}
          currencyCode={currencyCode}
          currencySymbol={currencySymbol}
        />
        <CoinDescriptionLinks data={data} />
      </div>
      <div className="border dark:bg-white bg-black dark:opacity-10 opacity-60 my-6 sm:my-8"></div>
      <CoinMetrics data={data} currencyCode={currencyCode} />
    </main>
  );
}
