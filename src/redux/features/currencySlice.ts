import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Currency = {
  symbol: string;
  code: string;
};

type CurrencyState = {
  currentCurrency: Currency;
  currencies: Currency[];
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
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateCurrency: (state, action: PayloadAction<Currency>) => {
      state.currentCurrency = action.payload;
    },
  },
});

export const { updateCurrency } = currencySlice.actions;
export default currencySlice.reducer;
