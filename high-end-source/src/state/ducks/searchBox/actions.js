import * as types from './types';

export const actionGetSuggestionsPlacesStart = payload => ({
  type: types.REQUEST_SUGGESTIONS_PLACES_START,
  payload,
});

export const requestSuggestionsPlacesSuccess = payload => ({
  type: types.REQUEST_SUGGESTIONS_PLACES_SUCCESS,
  payload,
});

export const actionSelectSuggestionPlace = payload => ({
  type: types.SELECT_SUGGESTION_PLACE,
  payload,
});

export const actionCleanSuggestions = payload => ({
  type: types.CLEAN_SUGGESTIONS,
  payload,
});
