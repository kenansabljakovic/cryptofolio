"use client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { Spinner } from "@nextui-org/spinner";
import { AppDispatch, useAppSelector } from "../../redux/store";
import {
  getCoinMarketData,
  resetCoinsData,
} from "../../redux/features/coinsTableSlice";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import CoinsMarketStats from "./CoinsMarketStats";

export default function TableCoins() {
  const [hasMore, setHasMore] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const { coins, loading, hasError, currentPage } = useAppSelector(
    (state) => state.coinsTable
  );

  const currencyCode = useAppSelector(
    (state) => state.currency.currentCurrency.code
  );

  const resetTrigger = useAppSelector((state) => state.currency.resetTrigger);

  useEffect(() => {
    if (resetTrigger > 0) {
      dispatch(resetCoinsData());
      dispatch(
        getCoinMarketData({
          currency: currencyCode,
          page: 1,
        })
      );
    }
  }, [resetTrigger, dispatch]);

  const fetchMoreData = () => {
    if (loading) {
      if (coins.length < 300) {
        dispatch(
          getCoinMarketData({
            currency: currencyCode,
            page: currentPage,
          })
        );
      } else {
        setHasMore(false);
      }
    }
  };

  if (hasError) {
    return <div>Error fetching data</div>;
  }

  return (
    <InfiniteScroll
      dataLength={coins.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div className="mt-2 text-center">
          <Spinner color="default" />
        </div>
      }
      endMessage={<p>You are all set! No more records to load.</p>}
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
