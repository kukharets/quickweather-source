import axios from 'axios';
import {
  PLACES_AUTOCOMPLETE_REQUEST_START,
  PLACES_AUTOCOMPLETE_REQUEST_SUCCESS,
  PLACES_AUTOCOMPLETE_REQUEST_ERROR,
  GET_PLACE_DETAILS_REQUEST_START,
  GET_PLACE_DETAILS_REQUEST_SUCCESS,
  GET_PLACE_DETAILS_REQUEST_ERROR,
  CLEAN_SUGGESTIONS,
  SELECT_PLACE,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_START,
  FETCH_WEATHER_ERROR,
  SAVE_PLACE,
  REMOVE_PLACE,
  GOOGLE_API_LOAD,
} from '../constans/actionTypes';
import weatherParser from '../helpers/weatherParser';
import history from '../helpers/history';

export const actionClearSuggestions = () => ({ type: CLEAN_SUGGESTIONS });
export const actionSelectPlace = place => async dispatch => {
  if (place && place.place_id) {
    history.push(`?${place.place_id}`);
  } else {
    history.push('');
  }
  dispatch({
    type: SELECT_PLACE,
    payload: place,
  });
};

export const actionGoogleApiLoad = () => async dispatch => {
  dispatch({
    type: GOOGLE_API_LOAD,
  });
};

export const actionSavePlace = place => async dispatch => {
  dispatch({
    type: SAVE_PLACE,
    payload: place,
  });
};

export const actionRemovePlace = id => async dispatch => {
  dispatch({
    type: REMOVE_PLACE,
    payload: id,
  });
};

export const placesAutocompleteRequest = inputValue => dispatch => {
  dispatch({
    type: PLACES_AUTOCOMPLETE_REQUEST_START,
    payload: inputValue,
  });

  const displaySuggestions = (predictions, status) => {
    switch (status) {
      case window.google.maps.places.PlacesServiceStatus.OK:
        dispatch({
          type: PLACES_AUTOCOMPLETE_REQUEST_SUCCESS,
          payload: { places: predictions, forInputValue: inputValue },
        });
        break;
      case window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
        dispatch({
          type: PLACES_AUTOCOMPLETE_REQUEST_SUCCESS,
          payload: { places: [], forInputValue: inputValue },
        });
        break;
      default:
        dispatch({
          type: PLACES_AUTOCOMPLETE_REQUEST_ERROR,
          payload: status,
        });
    }
  };
  const service = new window.google.maps.places.AutocompleteService();
  service.getPlacePredictions(
    { input: inputValue, types: ['(cities)'], locale: 'uk' },
    displaySuggestions,
  );
};

export const actionGetPlaceDetails = placeID => dispatch => {
  dispatch({
    type: GET_PLACE_DETAILS_REQUEST_START,
    payload: placeID,
  });
  const placeService = new window.google.maps.places.PlacesService(
    document.createElement('div'),
  );
  const request = {
    placeId: placeID,
    fields: ['formatted_address', 'geometry'],
  };
  placeService.getDetails(request, function(place = {}, status) {
    switch (status) {
      case window.google.maps.places.PlacesServiceStatus.OK: {
        const { geometry: { location: { lat, lng } = {} } = {} } = place;
        if (typeof lat === 'function' && typeof lng === 'function') {
          dispatch({
            type: GET_PLACE_DETAILS_REQUEST_SUCCESS,
            payload: {
              coordinates: { lat: lat(), lng: lng() },
              structured_formatting: {
                main_text: place.formatted_address.split(',')[0],
                secondary_text: place.formatted_address.split(/, (.+)/)[1],
              },
              forPlaceId: placeID,
            },
          });
        } else {
          dispatch({
            type: GET_PLACE_DETAILS_REQUEST_ERROR,
            payload: {
              error: "Can't resolve place coordinates for get weather data",
              forPlaceId: placeID,
            },
          });
        }

        break;
      }
      default:
        dispatch({
          type: GET_PLACE_DETAILS_REQUEST_ERROR,
          payload: status,
        });
    }
  });
};

export const actionFetchWeather = data => async dispatch => {
  const {
    placeID,
    placeCoordinates: { lng, lat },
  } = data;
  dispatch({
    type: FETCH_WEATHER_START,
    payload: data,
  });

  axios
    .get(
      `
        https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=14fa71fd3e45b88c82835e9a1e1e1ab9`,
    )
    .then(response => {
      dispatch({
        type: FETCH_WEATHER_SUCCESS,
        payload: {
          forPlaceId: placeID,
          dailyWeather: weatherParser(response),
        },
      });
    })
    .catch(error =>
      dispatch({
        type: FETCH_WEATHER_ERROR,
        payload: {
          error: `Problem with get weather. Details: ${error}`,
          forPlaceId: placeID,
        },
      }),
    );
};
