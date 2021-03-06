import * as types from './types';
import { createReducer } from '../../index';

const googleMapsApiInitialState = {
  loaded: false,
};

const googlePlacesServiceInitialState = {
  init: false,
};

const googleMapsApiReducer = createReducer(googleMapsApiInitialState)({
  [types.LOAD_GOOGLE_MAPS_API_SUCCESS]: () => {
    return { loaded: true };
  },
});

const googlePlacesServiceReducer = createReducer(
  googlePlacesServiceInitialState,
)({
  [types.INIT_GOOGLE_PLACES_SERVICE_SUCCESS]: () => {
    return { init: true };
  },
});

const googleAutocompleteServiceReducer = createReducer(
  false,
)({
  [types.INIT_GOOGLE_AUTOCOMPLETE_SERVICE_SUCCESS]: (state, action) => {
    return action.payload;
  },
});

export default {
  googleMapsApiReducer,
  googlePlacesServiceReducer,
  googleAutocompleteServiceReducer,
};
