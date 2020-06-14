import { all, put, takeEvery, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_WEATHER_START } from './types';

import { actionFetchWeatherSuccess, actionFetchWeatherError } from './actions';
import weatherParser from "../../../utils/weatherParser";

function fetchWeatherApi({ lng, lat }) {
  return axios.get(
    `
        https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=14fa71fd3e45b88c82835e9a1e1e1ab9`,
  );
}

function* fetchWeatherRequest({ payload }) {
  const { lng, lat } = payload;

  try {
    const weather = yield call(fetchWeatherApi, { lng, lat });
    yield put(actionFetchWeatherSuccess(weatherParser(weather)));
  } catch (error) {
    yield put(
      actionFetchWeatherError(`Problem with get weather. Details: ${error}`),
    );
  }
}

export function* sagaFetchWeatherRequest() {
  yield takeEvery(FETCH_WEATHER_START, fetchWeatherRequest);
}

export default function* weatherSaga() {
  yield all([fork(sagaFetchWeatherRequest)]);
}
