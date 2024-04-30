"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type GetCoinMarketDataArgs = {
  currency: string;
  page: number;
};

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi?: null;
  last_updated: string;
  sparkline_in_7d: SparklineIn7d;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};
type SparklineIn7d = {
  price: number[];
};

type CoinMarketData = {
  coins: Coin[];
  loading: string;
  hasError: boolean;
  currentPage: number;
};

const initialState: CoinMarketData = {
  coins: [],
  loading: "idle",
  hasError: false,
  currentPage: 1,
};

export const getCoinMarketData = createAsyncThunk(
  "coinMarket/getCoinMarketData",
  async ({ currency, page }: GetCoinMarketDataArgs, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const coinsTableData = createSlice({
  name: "coinsTable",
  initialState,
  reducers: {
    resetCoinsData: (state) => {
      state.coins = [];
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoinMarketData.pending, (state) => {
        state.loading = "pending";
        state.hasError = false;
      })
      .addCase(getCoinMarketData.fulfilled, (state, action) => {
        state.coins = [...state.coins, ...action.payload];
        state.loading = "fulfilled";
        state.currentPage += 1;
      })
      .addCase(getCoinMarketData.rejected, (state, action) => {
        state.loading = "rejected";
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export const { resetCoinsData } = coinsTableData.actions;
export default coinsTableData.reducer;
