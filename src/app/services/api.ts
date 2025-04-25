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
  

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3',
  }),
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
  }),
});

export const { useGetGlobalDataQuery, useGetCoinMarketsQuery, useGetCoinMarketChartQuery, useGetCoinDetailsQuery } = cryptoApi;