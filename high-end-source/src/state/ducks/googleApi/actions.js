import * as types from './types';

export const actionLoadGoogleMapsApiStart = () => ({
  type: types.LOAD_GOOGLE_MAPS_API_START,
});

export const loadGoogleMapsApiSuccess = () => ({
  type: types.LOAD_GOOGLE_MAPS_API_SUCCESS,
});

export const loadGoogleMapsApiError = payload => ({
  type: types.LOAD_GOOGLE_MAPS_API_ERROR,
  payload,
});

export const initGooglePlacesServiceSuccess = payload => ({
  type: types.INIT_GOOGLE_PLACES_SERVICE_SUCCESS,
  payload,
});

export const initGooglePlacesServiceError = payload => ({
  type: types.INIT_GOOGLE_PLACES_SERVICE_ERROR,
  payload,
});

export const initGoogleAutocompleteServiceSuccess = payload => ({
  type: types.INIT_GOOGLE_AUTOCOMPLETE_SERVICE_SUCCESS,
  payload,
});

export const initGoogleAutocompleteServiceError = payload => ({
  type: types.INIT_GOOGLE_AUTOCOMPLETE_SERVICE_ERROR,
  payload,
});

export const placesAutocompleteRequestStart = payload => ({
  type: types.PLACES_AUTOCOMPLETE_REQUEST_START,
  payload,
});

export const placesAutocompleteRequestSuccess = payload => ({
  type: types.PLACES_AUTOCOMPLETE_REQUEST_SUCCESS,
  payload,
});

export const placesAutocompleteRequestError = payload => ({
  type: types.PLACES_AUTOCOMPLETE_REQUEST_ERROR,
  payload,
});

export const actionPlaceDetailsRequestStart = payload => ({
  type: types.PLACE_DETAILS_REQUEST_START,
  payload,
});

export const placeDetailsRequestSuccess = payload => ({
  type: types.PLACE_DETAILS_REQUEST_SUCCESS,
  payload,
});

export const placeDetailsRequestError = payload => ({
  type: types.PLACE_DETAILS_REQUEST_ERROR,
  payload,
});
