import * as types from './types';
import { createReducer } from '../../index';

const lastWeather = JSON.parse(localStorage.getItem('lastWeather'));

const weatherInitialState = {
  fetchInProgress: false,
  fetchError: undefined,
  weatherData: lastWeather || undefined,
};

const weatherReducer = createReducer(weatherInitialState)({
  [types.FETCH_WEATHER_START]: () => {
    return { fetchInProgress: true, weatherData: undefined };
  },
  [types.FETCH_WEATHER_SUCCESS]: (state, action) => {
    localStorage.setItem('lastWeather', JSON.stringify(action.payload));
    return { fetchInProgress: false, weatherData: action.payload };
  },
  [types.FETCH_WEATHER_ERROR]: (state, action) => {
    return { fetchInProgress: false, fetchError: action.payload };
  },
});

export default {
  weatherReducer,
};
