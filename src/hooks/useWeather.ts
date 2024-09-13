import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPlaceWeather } from '@slices/weather';
import { IGooglePlaceFull } from '@slices/app';

import {
  selectPlaceWeatherByPlaceId,
  selectPlaceWeatherErrorByPlaceId,
  selectPlaceWeatherIsLoadingByPlaceId,
} from '@selectors/weather';
import { AppDispatch } from '@root/store';

import { parseWeather } from '@utils/parseWeatherData';

export const useWeather = ({ location: { place_id, coordinates } }: { location: IGooglePlaceFull }) => {
  const dispatch: AppDispatch = useDispatch();

  const isWeatherDataLoading = useSelector(selectPlaceWeatherIsLoadingByPlaceId(place_id));
  const weatherError = useSelector(selectPlaceWeatherErrorByPlaceId(place_id));
  const weatherData = useSelector(selectPlaceWeatherByPlaceId(place_id));

  const parsedWeatherData = parseWeather(weatherData);

  useEffect(() => {
    if (coordinates) {
      dispatch(fetchPlaceWeather({ place_id, coordinates }));
    }
  }, [coordinates]);

  return { parsedWeatherData, isWeatherDataLoading, weatherError };
};
