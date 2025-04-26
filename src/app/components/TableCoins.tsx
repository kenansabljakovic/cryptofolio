"use client";
import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@nextui-org/spinner";
import { useAppSelector } from "../../redux/store";
import { useGetCoinMarketPaginatedQuery } from "../services/api";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import CoinsMarketStats from "./CoinsMarketStats";

export default function TableCoins() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const currencyCode = useAppSelector(
    (state) => state.currency.currentCurrency.code
  );

  const resetTrigger = useAppSelector((state) => state.currency.resetTrigger);
  
  // Track previous currency to detect changes
  const prevCurrencyRef = useRef(currencyCode);

  // Use RTK Query hook for fetching data
  // Skip the query on the very first render after a currency change while we are resetting the page to 1
  const shouldSkip = prevCurrencyRef.current !== currencyCode && page !== 1;

  const { data: coins = [], isLoading, error, isFetching } = useGetCoinMarketPaginatedQuery(
    {
      currency: currencyCode,
      page: page,
    },
    {
      skip: shouldSkip,
    }
  );

  // When the currency actually changes, reset pagination and update the prev currency ref
  useEffect(() => {
    if (prevCurrencyRef.current !== currencyCode) {
      setPage(1);
      setHasMore(true);
      prevCurrencyRef.current = currencyCode;
    }
  }, [currencyCode]);

  const fetchMoreData = () => {
    // Only fetch more if we're not already fetching and have more data to fetch
    if (!isFetching && coins.length < 300) {
      setPage(prevPage => prevPage + 1);
    } else if (coins.length >= 300) {
      setHasMore(false);
    }
  };

  if (error) {
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
      endMessage={<p className="text-center mt-4 mb-4">You are all set! No more records to load.</p>}
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
            <TableHead className="hidden lg:table-cell text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
              1h%
            </TableHead>
            <TableHead className="text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
              24h %
            </TableHead>
            <TableHead className="hidden lg:table-cell text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
              7d%
            </TableHead>
            <TableHead className="hidden lg:table-cell text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
              24h volume / Market Cap
            </TableHead>
            <TableHead className="hidden lg:table-cell text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4">
              Circulating / Total supply
            </TableHead>
            <TableHead className="hidden lg:table-cell text-sm font-normal dark:text-[#D1D1D1] text-[#424286] leading-4 text-right">
              Last 7d
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin, index) => (
            <CoinsMarketStats key={coin.id} coin={coin} index={index} />
          ))}
        </TableBody>
      </Table>
    </InfiniteScroll>
  );
}