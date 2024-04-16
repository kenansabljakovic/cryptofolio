"use client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { getCoinMarketData } from "../../redux/features/coinsTableSlice";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

import CoinsMarketStats from "./CoinsMarketStats";

export default function TableCoins() {
  const dispatch: AppDispatch = useDispatch();
  const { coins, loading, hasError, currentPage } = useAppSelector(
    (state) => state.coinsTable
  );

  const currencyCode = useAppSelector(
    (state) => state.currency.currentCurrency.code
  );

  /* useEffect(() => {
    if (coins.length === 0 && loading !== "pending") {
      // Checks if there are no coins and nothing is currently loading
      dispatch(
        getCoinMarketData({ currency: currencyCode, page: currentPage })
      );
    }
  }, [dispatch, currencyCode]); */
  //When I use useEffect it fetches 1st page two times, also currency dropdown selector doesn't work.
  //When i try to change to different currency from the dropdown currency menu it doesn't fetch data for the selected currency.

  const fetchMoreData = () => {
    if (loading !== "pending") {
      dispatch(
        getCoinMarketData({ currency: currencyCode, page: currentPage })
      );
    } else {
      console.log("Fetch in progress, waiting to complete");
    }
  };

  if (hasError) {
    return <div>Error fetching data</div>;
  }

  return (
    <InfiniteScroll
      dataLength={coins.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
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
            <CoinsMarketStats coin={coin} index={index} key={coin.id + index} />
          ))}
        </TableBody>
      </Table>
    </InfiniteScroll>
  );
}
