import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { openWeatherApi } from '../services/openWeatherApi';
import temperatureReducer from '../features/temperature';

const store = configureStore({
 reducer: {
  [openWeatherApi.reducerPath]: openWeatherApi.reducer,
  temperature: temperatureReducer,
 },

 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(openWeatherApi.middleware),
});

export default store;

export type RootState = {
  temperature: {
    kelvin: number,
    celsius: number,
    fahrenheit: number,
  }
}
