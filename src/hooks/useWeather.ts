import { IGooglePlaceFull } from '../slices/app';
import {
  selectPlaceWeatherByPlaceId,
  selectPlaceWeatherErrorByPlaceId,
  selectPlaceWeatherIsLoadingByPlaceId,
} from '../selectors/weather';
import { useEffect } from 'react';
import { fetchPlaceWeather } from '../slices/weather';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { parseWeather } from '../utils/parseWeatherData';

export const useWeather = ({ location }: { location: IGooglePlaceFull }) => {
  const dispatch: AppDispatch = useDispatch();
  const { place_id } = location;
  const isWeatherDataLoading = useSelector(selectPlaceWeatherIsLoadingByPlaceId(place_id));
  const weatherError = useSelector(selectPlaceWeatherErrorByPlaceId(place_id));

  const weatherData = useSelector(selectPlaceWeatherByPlaceId(place_id));
  const parsedWeatherData = parseWeather(weatherData);

  useEffect(() => {
    if (location.coordinates && !weatherData) {
      dispatch(fetchPlaceWeather(location));
    }
  }, [location]);

  return { parsedWeatherData, isWeatherDataLoading, weatherError };
};
