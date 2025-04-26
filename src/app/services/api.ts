import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type GlobalData = {
  active_cryptocurrencies: number;
  markets: number;
  total_volume: { [coin: string]: number };
  total_market_cap: { [coin: string]: number };
  market_cap_percentage: { [coin: string]: number };
  market_cap_change_percentage_24h_usd: number;
};

type CoinMarketData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  last_updated: string;
  // Added these missing fields required by CoinsMarketStats
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: {
    price: number[];
  };
};

type CoinChartData = {
  id: string;
  prices: [number, number][];
  total_volumes: [number, number][];
};

type CoinDetails = {
  id: string;
  name: string;
  symbol: string;
};

export type CoinInfo = {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  image: { thumb: string; small: string; large: string }; // Added more image sizes often available
  links: { homepage: string[]; blockchain_site: string[]; official_forum_url: string[]; subreddit_url: string; }; // Added more link types
  market_data: {
    current_price: { [key: string]: number };
    price_change_percentage_24h_in_currency: { [key: string]: number };
    ath: { [key: string]: number };
    ath_date: { [key: string]: string };
    atl: { [key: string]: number };
    atl_date: { [key: string]: string };
    total_volume: { [key: string]: number };
    market_cap: { [key: string]: number };
    market_cap_change_24h_in_currency: { [key: string]: number };
    fully_diluted_valuation: { [key: string]: number };
    max_supply: number | null; // Can be null
    circulating_supply: number;
    total_supply: number | null; // Can be null
  };
  community_data?: { // Optional community data
    facebook_likes: number | null;
    twitter_followers: number | null;
    reddit_average_posts_48h: number | null;
    reddit_average_comments_48h: number | null;
    reddit_subscribers: number | null;
    reddit_accounts_active_48h: string | null; // API sometimes returns string like "46.0"?
    telegram_channel_user_count: number | null;
  };
  // Add other potential fields if needed: public_interest_stats, status_updates, etc.
};

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3',
  }),
  tagTypes: ['CoinMarkets'],
  endpoints: (builder) => ({
    getGlobalData: builder.query<{ data: GlobalData }, void>({
      query: () => `/global?x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    }),
    getCoinMarkets: builder.query<CoinMarketData[], string>({
      query: (currency) => 
        `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    }),
    getCoinMarketChart: builder.query<CoinChartData, { coinId: string; currency: string; days: string }>({
      query: ({ coinId, currency, days }) => 
        `/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      transformResponse: (response: any, meta, arg) => {
        return {
          id: arg.coinId,
          prices: response.prices,
          total_volumes: response.total_volumes
        };
      }
    }),
    getCoinDetails: builder.query<CoinDetails, string>({
      query: (coinId) => 
        `/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    }),
    getCoinMarketPaginated: builder.query<CoinMarketData[], { currency: string; page: number }>({
      query: ({ currency, page }) => 
        `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      // Group queries by currency only to consolidate pages
      serializeQueryArgs: ({ queryArgs }) => queryArgs.currency,
      // Force a re-fetch if page or currency changes
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.currency !== previousArg?.currency
        );
      },
      // Merge function to append new page results to existing data
      merge: (currentCache, newItems, { arg }) => {
        // If it's the first page, replace the cache
        if (arg.page === 1) {
          return newItems;
        }
        // Otherwise append new items to the cache
        return [...currentCache, ...newItems];
      },
      // This tags the data for future invalidation if needed
      providesTags: ['CoinMarkets']
    }),
    getCoinPageInfo: builder.query<CoinInfo, string>({ // Takes coinId string, returns CoinInfo
      query: (coinId) =>
        `/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      // Optional: Add providesTags if this data might be invalidated by other actions
      // providesTags: (result, error, coinId) => [{ type: 'CoinDetail', id: coinId }],
    }),
  }),
});

export const { 
  useGetGlobalDataQuery, 
  useGetCoinMarketsQuery, 
  useGetCoinMarketChartQuery, 
  useGetCoinDetailsQuery,
  useGetCoinMarketPaginatedQuery,
  useGetCoinPageInfoQuery // Export the new hook
} = cryptoApi;