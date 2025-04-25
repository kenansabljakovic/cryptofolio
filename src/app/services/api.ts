import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type GlobalData = {
  active_cryptocurrencies: number;
  markets: number;
  total_volume: { [coin: string]: number };
  total_market_cap: { [coin: string]: number };
  market_cap_percentage: { [coin: string]: number };
  market_cap_change_percentage_24h_usd: number;
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
  }),
});

export const { useGetGlobalDataQuery } = cryptoApi;