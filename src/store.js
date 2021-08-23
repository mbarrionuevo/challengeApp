import { configureStore } from "@reduxjs/toolkit";
import converCrytocurrenciesReducer from './redux/ConverterCryptocurrenciesSlice';
import feeReducer from './redux/FeeSlice';

export const store = configureStore({
  reducer: {
    converterCryptocurrencies: converCrytocurrenciesReducer,
    fee: feeReducer
  },
});
