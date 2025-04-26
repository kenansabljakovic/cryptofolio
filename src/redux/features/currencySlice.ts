import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    symbol: '$',
    code: 'usd',
  },
  currencies: [
    {
      symbol: '$',
      code: 'usd',
    },
    {
      symbol: '€',
      code: 'eur',
    },
    {
      symbol: '£',
      code: 'gbp',
    },
    {
      symbol: 'C$',
      code: 'cad',
    },
    {
      symbol: '₣',
      code: 'chf',
    },
    {
      symbol: 'A$',
      code: 'aud',
    },
    {
      symbol: '₹',
      code: 'inr',
    },
    {
      symbol: '¥',
      code: 'jpy',
    },
    {
      symbol: 'zł',
      code: 'pln',
    },
    {
      symbol: '₿',
      code: 'btc',
    },
    {
      symbol: 'Ξ',
      code: 'eth',
    },
    {
      symbol: 'Ł',
      code: 'ltc',
    },
  ],
  resetTrigger: 0,
};

export const currencySlice = createSlice({
  name: 'currency',
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
