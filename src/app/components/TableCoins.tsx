"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { getCoinMarketData } from "../../redux/features/coinsTableSlice";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

import CoinsMarketStats from "./CoinsMarketStats";

export default function TableCoins() {
  const dispatch: AppDispatch = useDispatch();
  const { coins, hasError, currentPage } = useAppSelector(
    (state) => state.coinsTable
  );

  const currencyCode = useAppSelector(
    (state) => state.currency.currentCurrency.code
  );

  useEffect(() => {
    dispatch(getCoinMarketData({ currency: currencyCode, page: currentPage }));
  }, [dispatch, currencyCode, currentPage]);

  if (hasError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden lg:table-cell text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
            #
          </TableHead>
          <TableHead className="text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
            Name
          </TableHead>
          <TableHead className="text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
            Price
          </TableHead>
          <TableHead className="text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
            1h%
          </TableHead>
          <TableHead className="text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
            24h%
          </TableHead>
          <TableHead className="hidden sm:table-cell text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
            7d%
          </TableHead>
          <TableHead className="hidden md:table-cell text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
            24h volume / Market Cap
          </TableHead>
          <TableHead className="hidden lg:table-cell text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
            Circulating / Total supply
          </TableHead>
          <TableHead className="hidden xl:table-cell w-[162px] text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
            Last 7d
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coins.map((coin, index) => (
          <CoinsMarketStats coin={coin} index={index} key={coin.id} />
        ))}
      </TableBody>
    </Table>
  );
}
