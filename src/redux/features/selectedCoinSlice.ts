"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type GetCoinDataArgs = {
  currency: string;
  days: string;
  coinId: string;
};

type CoinData = {
  id: string;
  prices: [number, number][];
  total_volumes: [number, number][];
};

type selectedCoinState = {
  selectedCoins: CoinData[];
  loading: string;
  hasError: boolean;
};

const initialState: selectedCoinState = {
  selectedCoins: [],
  loading: "idle",
  hasError: false,
};

export const getCoinDataGraph = createAsyncThunk(
  "coinData/getCoinData",
  async ({ currency, days, coinId }: GetCoinDataArgs, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const { prices, total_volumes } = data;
      const item: CoinData = {
        id: coinId,
        prices,
        total_volumes,
      };
      return item;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const selectedCoinsSlice = createSlice({
  name: "selectedCoin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCoinDataGraph.pending, (state) => {
        state.loading = "pending";
        state.hasError = false;
      })
      .addCase(getCoinDataGraph.fulfilled, (state, action) => {
        state.selectedCoins = [action.payload];
        state.loading = "fulfilled";
      })
      .addCase(getCoinDataGraph.rejected, (state, action) => {
        state.loading = "rejected";
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export default selectedCoinsSlice.reducer;
