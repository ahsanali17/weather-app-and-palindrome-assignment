import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { WEATHER_BASE_URL, WEATHER_API_KEY} from '../constants';

export const openWeatherApi = createApi({
 reducerPath: 'openWeatherApi',
 baseQuery: fetchBaseQuery({
  baseUrl: WEATHER_BASE_URL,
 }),

 keepUnusedDataFor: 60,
 endpoints: (builder) => ({
  getWeatherDataByLonAndLan: builder.query({
   query: ({ lat, lon }) => {
    return `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
   },
  }),

  getCityByName: builder.query({
   query: (cityName): string => {
    return `/geo/1.0/direct?q=${cityName}&limit=5&units=metric&appid=${WEATHER_API_KEY}`
   }
  })
 }),
});

export const { useGetWeatherDataByLonAndLanQuery, useGetCityByNameQuery } = openWeatherApi;

