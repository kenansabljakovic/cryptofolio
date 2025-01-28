import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type CryptoState = {
  data: {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
  }[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: CryptoState = {
  data: [],
  isLoading: false,
  hasError: false,
};

export const getCoinData = createAsyncThunk(
  "global/getCoinData",
  async (currencyCode: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyCode}&order=market_cap_desc&per_page=100&page=1&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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

const coinInfoSlice = createSlice({
  name: "coinData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoinData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getCoinData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getCoinData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export default coinInfoSlice.reducer;
