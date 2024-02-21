import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
console.log(process.env);
type InitialState = {
  data: GlobalData;
  isLoading: boolean;
  hasError: boolean;
};

type Coin = {
  [coin: string]: number;
};

type GlobalData = {
  active_cryptocurrencies: number;
  markets: number;
  total_volume: Coin;
  total_market_cap: Coin;
  market_cap_percentage: Coin;
  market_cap_change_percentage_24h_usd: number;
};

const initialState = {
  data: {
    active_cryptocurrencies: 0,
    markets: 0,
    total_volume: { usd: 0 },
    total_market_cap: { usd: 0 },
    market_cap_percentage: { btc: 0, eth: 0 },
    market_cap_change_percentage_24h_usd: 0,
  } as GlobalData,
  isLoading: false,
  hasError: false,
} as InitialState;

export const getGlobalData = createAsyncThunk(
  "global/getGlobalData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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

const globalSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGlobalData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getGlobalData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getGlobalData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export default globalSlice.reducer;
