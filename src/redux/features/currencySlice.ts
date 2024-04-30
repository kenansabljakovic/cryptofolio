import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resetCoinsData } from "../../redux/features/coinsTableSlice";

type Currency = {
  symbol: string;
  code: string;
};

type CurrencyState = {
  currentCurrency: Currency;
  currencies: Currency[];
  resetTrigger: number;
};

const initialState: CurrencyState = {
  currentCurrency: {
    symbol: "$",
    code: "usd",
  },
  currencies: [
    {
      symbol: "$",
      code: "usd",
    },
    {
      symbol: "€",
      code: "eur",
    },
    {
      symbol: "£",
      code: "gbp",
    },
  ],
  resetTrigger: 0,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateCurrency: (state, action: PayloadAction<Currency>) => {
      state.currentCurrency = action.payload;
      state.resetTrigger++;
    },
  },
});

export const { updateCurrency } = currencySlice.actions;
export default currencySlice.reducer;
