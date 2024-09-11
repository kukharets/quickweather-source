import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IGooglePlaceFull } from '@slices/app';

export interface WeatherData {
  clouds: {
    all: number;
  };
  dt: number;
  main: {
    humidity: number;
    temp: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
  };
  rain: {
    '3h': number;
  };
  snow: {
    '3h': number;
  };
}

interface WeatherState {
  data: Record<string, WeatherData>;
  isLoading: Record<string, boolean>;
  error: Record<string, string | null>;
}

const initialState: WeatherState = {
  data: {},
  isLoading: {},
  error: {},
};
export const fetchPlaceWeather = createAsyncThunk<WeatherData, IGooglePlaceFull>(
  'weather/fetchPlaceWeather',
  async ({ coordinates }: IGooglePlaceFull) => {
    if (!coordinates) {
      throw new Error('Coordinates not available');
    }
    const { lat, lng } = coordinates;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`,
    );
    return response.data;
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaceWeather.pending, (state, action) => {
        const placeId = action.meta.arg.place_id;
        state.isLoading[placeId] = true;
        state.error[placeId] = null;
      })
      .addCase(fetchPlaceWeather.fulfilled, (state, action) => {
        const placeId = action.meta.arg.place_id;
        state.data[placeId] = action.payload;
        state.isLoading[placeId] = false;
      })
      .addCase(fetchPlaceWeather.rejected, (state, action) => {
        const placeId = action.meta.arg.place_id;
        state.isLoading[placeId] = false;
        state.error[placeId] = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export default weatherSlice.reducer;
