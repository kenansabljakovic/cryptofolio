import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type InitialState = {
  data: CoinInfo;
  isLoading: boolean;
  hasError: boolean;
};

type GetCoinPageDataArgs = {
  coin: string;
};

type Coin = {
  [key: string]: number;
};

type TimeStamp = {
  [key: string]: string;
};

type MarketData = {
  current_price: Coin;
  price_change_percentage_24h_in_currency: Coin;
  ath: Coin;
  ath_date: TimeStamp;
  atl: Coin;
  atl_date: TimeStamp;
  total_volume: Coin;
  market_cap_change_24h_in_currency: Coin;
  max_supply: number;
  circulating_supply: number;
  market_cap: Coin;
  fully_diluted_valuation: Coin;
};

type CoinInfo = {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  image: { [name: string]: string };
  links: { homepage: string[]; blockchain_site: string[] };
  market_data: MarketData;
};

const initialState = {
  data: {
    id: "",
    symbol: "",
    name: "",
    description: { en: "" },
    image: { thumb: "" },
    links: { homepage: [], blockchain_site: [] },
    market_data: {
      current_price: {},
      price_change_percentage_24h_in_currency: {},
      ath: {},
      ath_date: {},
      atl: {},
      atl_date: {},
      total_volume: {},
      market_cap_change_24h_in_currency: {},
      max_supply: 0,
      circulating_supply: 0,
      market_cap: {},
      fully_diluted_valuation: {},
    },
  } as CoinInfo,
  isLoading: false,
  hasError: false,
} as InitialState;

export const getCoinPageData = createAsyncThunk(
  "coin/getCoinPageData",
  async ({ coin }: GetCoinPageDataArgs, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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

const coinPageSlice = createSlice({
  name: "coinPageData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoinPageData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getCoinPageData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getCoinPageData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  },
});

export default coinPageSlice.reducer;
