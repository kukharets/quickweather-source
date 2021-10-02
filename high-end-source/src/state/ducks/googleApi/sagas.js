import { all, put, takeEvery, fork, call, select } from 'redux-saga/effects';

import {
  LOAD_GOOGLE_MAPS_API_START,
  INIT_GOOGLE_PLACES_SERVICE_START,
  INIT_GOOGLE_AUTOCOMPLETE_SERVICE_START,
  PLACES_AUTOCOMPLETE_REQUEST_START,
  PLACE_DETAILS_REQUEST_START,
} from './types';

import {
  loadGoogleMapsApiError,
  loadGoogleMapsApiSuccess,
  initGooglePlacesServiceSuccess,
  initGooglePlacesServiceError,
  initGoogleAutocompleteServiceSuccess,
  initGoogleAutocompleteServiceError,
  placesAutocompleteRequestSuccess,
  placesAutocompleteRequestError,
  placeDetailsRequestSuccess,
  placeDetailsRequestError,
} from './actions';
import store from "../../store";

const googlePlacesAutocompleteRequest = (value, service) =>
  new Promise((resolve, reject) => {
    service.getPlacePredictions(
      { input: value, types: ['(cities)'], locale: 'uk' },
      (predictions, status) => {
        switch (status) {
          case window.google.maps.places.PlacesServiceStatus.OK:
          case window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
            resolve(predictions);
            break;
          default:
            reject(status);
        }
      },
    );
  }).then(res => res);

const initGoogleApiCallback = () =>
  new Promise(resolve => {
    window.initMap = () => resolve();
  }).then(() => true);

function* initGoogleAutocompleteService() {
  try {
    const autocompleteService = new window.google.maps.places.AutocompleteService();
    yield put(initGoogleAutocompleteServiceSuccess(autocompleteService));
  } catch (error) {
    yield put(
      initGoogleAutocompleteServiceError(`Google Places API error: ${error}`),
    );
  }
}

function* initGooglePlacesService() {
  try {
    const placeService = new window.google.maps.places.PlacesService(
      document.createElement('div'),
    );
    yield put(initGooglePlacesServiceSuccess(placeService));
  } catch (error) {
    yield put(
      initGooglePlacesServiceError(`Google Places API error: ${error}`),
    );
  }
}

function* loadGoogleMapApi() {
  try {
    const scriptEl = document.createElement(`script`);
    scriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GAPI_KEY}&callback=initMap&libraries=places&language=en`;
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, scriptEl);
    yield call(initGoogleApiCallback);
    yield call(initGoogleAutocompleteService);
    yield call(initGooglePlacesService);
    yield put(loadGoogleMapsApiSuccess());
  } catch (error) {
    yield put(loadGoogleMapsApiError(`Google Map API error: ${error}`));
  }
}

function* placesAutocompleteRequest({ payload }) {
  try {
    const getAutocompleteService = state =>
      state.googleAutocompleteServiceReducer;
    const service = yield select(getAutocompleteService);
    const autocompleteResult = yield call(
      googlePlacesAutocompleteRequest,
      payload,
      service,
    );
    yield put(placesAutocompleteRequestSuccess(autocompleteResult));
  } catch (error) {
    yield put(placesAutocompleteRequestError(error));
  }
}

function placeDetailsRequestCall(payload) {
  const placeService = store.getState().googlePlacesServiceReducer.serviceObj;
  const request = {
    placeId: payload,
    fields: ['formatted_address', 'geometry'],
  };
  return new Promise((resolve, reject) => {
    placeService.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const { geometry: { location: { lat, lng } = {} } = {} } = place;
        if (typeof lat === 'function' && typeof lng === 'function') {
          resolve({
            coordinates: { lat: lat(), lng: lng() },
            structured_formatting: {
              main_text: place.formatted_address.split(',')[0],
              secondary_text: place.formatted_address.split(/, (.+)/)[1],
            },
          });
        } else {
          reject('Problem with google Place Details API');
        }
      } else {
        reject(status);
      }
    });
  });
}

function* placeDetailsRequest({ payload }) {
  const { placeID } = payload;
  try {
    const res = yield call(placeDetailsRequestCall, placeID);
    yield put(placeDetailsRequestSuccess(Object.assign({}, payload, res)));
  } catch (error) {
    yield put(placeDetailsRequestError(error));
  }
}

export function* sagaLoadGoogleMapApi() {
  yield takeEvery(LOAD_GOOGLE_MAPS_API_START, loadGoogleMapApi);
}

export function* sagaInitGooglePlacesService() {
  yield takeEvery(INIT_GOOGLE_PLACES_SERVICE_START, initGooglePlacesService);
}

export function* sagaInitGoogleAutocompleteService() {
  yield takeEvery(
    INIT_GOOGLE_AUTOCOMPLETE_SERVICE_START,
    initGoogleAutocompleteService,
  );
}

export function* sagaPlacesAutocompleteRequest() {
  yield takeEvery(PLACES_AUTOCOMPLETE_REQUEST_START, placesAutocompleteRequest);
}

export function* sagaPlaceDetailsRequest() {
  yield takeEvery(PLACE_DETAILS_REQUEST_START, placeDetailsRequest);
}

export default function* googleApiSaga() {
  yield all([
    fork(sagaLoadGoogleMapApi),
    fork(sagaInitGooglePlacesService),
    fork(sagaInitGoogleAutocompleteService),
    fork(sagaPlacesAutocompleteRequest),
    fork(sagaPlaceDetailsRequest),
  ]);
}
