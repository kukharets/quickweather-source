import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectPlaceWeatherByPlaceId = (placeId: string) =>
  createSelector(
    (state: RootState) => state.weather.data,
    (data) => data[placeId],
  );

export const selectPlaceWeatherIsLoadingByPlaceId = (placeId: string) =>
  createSelector(
    (state: RootState) => state.weather.isLoading,
    (isLoading) => isLoading[placeId] || false,
  );

export const selectPlaceWeatherErrorByPlaceId = (placeId: string) =>
  createSelector(
    (state: RootState) => state.weather.error,
    (error) => error[placeId] || null,
  );
