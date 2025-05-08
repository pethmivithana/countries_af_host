import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import countriesReducer from '../features/countries/CountriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countriesReducer,
  },
});