import * as types from './types';
import { createReducer } from '../../index';

const googleMapsApiInitialState = {
  googleMapsApiLoaded: false,
};

const googlePlacesServiceInitialState = {
  serviceObj: null,
};

const googleMapsApiReducer = createReducer(googleMapsApiInitialState)({
  [types.LOAD_GOOGLE_MAPS_API_SUCCESS]: () => {
    return { googleMapsApiLoaded: true };
  },
});

const googlePlacesServiceReducer = createReducer(
  googlePlacesServiceInitialState,
)({
  [types.INIT_GOOGLE_PLACES_SERVICE_SUCCESS]: (state, action) => {
    const { payload } = action;
    return { serviceObj: payload };
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
