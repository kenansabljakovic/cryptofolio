"use client";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/globalSlice";
import currencyReducer from "./features/currencySlice";

export const store = configureStore({
  reducer: {
    globalData: globalReducer,
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
