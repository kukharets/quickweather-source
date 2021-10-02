import { all, put, takeEvery } from 'redux-saga/effects';

import {
  PLACE_DETAILS_REQUEST_SUCCESS,
  PLACES_AUTOCOMPLETE_REQUEST_SUCCESS,
} from './googleApi/types';
import {
  placesAutocompleteRequestStart,
  actionPlaceDetailsRequestStart,
} from './googleApi/actions';
import {
  REQUEST_SUGGESTIONS_PLACES_START, SELECT_SUGGESTION_PLACE,
} from './searchBox/types';
import { requestSuggestionsPlacesSuccess } from './searchBox/actions';
import { actionFetchWeatherStart } from './weather/actions';
import { SELECT_PLACE } from './places/types';

function* sagaRequestSuggestionsPlacesSuccess({ payload }) {
  yield put(requestSuggestionsPlacesSuccess(payload));
}

function* sagaPlacesAutocompleteRequestStart({ payload }) {
  yield put(placesAutocompleteRequestStart(payload));
}

function* sagaFetchWeatherRequest({ payload }) {
  if (payload) {
    const { coordinates } = payload;
    if (coordinates) {
      yield put(actionFetchWeatherStart(coordinates));
    }
  }
}

function* sagaSelectPlace({ payload }) {
  const { placeID, coordinates } = payload;
  if (!coordinates && placeID) {
    yield put(actionPlaceDetailsRequestStart(payload));
  }
  if (coordinates) {
    yield put(actionFetchWeatherStart(coordinates));
  }
}

export default function* ducksConnectorSaga() {
  yield all([
    takeEvery(
      PLACES_AUTOCOMPLETE_REQUEST_SUCCESS,
      sagaRequestSuggestionsPlacesSuccess,
    ),
    takeEvery(
      REQUEST_SUGGESTIONS_PLACES_START,
      sagaPlacesAutocompleteRequestStart,
    ),
    takeEvery(PLACE_DETAILS_REQUEST_SUCCESS, sagaFetchWeatherRequest),
    takeEvery(SELECT_PLACE, sagaSelectPlace),
    takeEvery(SELECT_SUGGESTION_PLACE, sagaSelectPlace),
  ]);
}
