import * as types from './types';

export const actionFetchWeatherStart = data => ({
  type: types.FETCH_WEATHER_START,
  payload: data,
});

export const actionFetchWeatherSuccess = data => {
  return {
    type: types.FETCH_WEATHER_SUCCESS,
    payload: data,
  };
};

export const actionFetchWeatherError = data => {
  return {
    type: types.FETCH_WEATHER_ERROR,
    payload: data,
  };
};
