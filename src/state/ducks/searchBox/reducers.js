import * as types from './types';
import { createReducer } from '../../index';

const initialState = {
  searchBoxSuggestedList: [],
  searchBoxSuggestedStoreUpdateTime: 0,
  selectedPlace: undefined,
};

const searchBoxReducer = createReducer([])({
  [types.REQUEST_SUGGESTIONS_PLACES_SUCCESS]: (state, action) => {
    return {
      searchBoxSuggestedList: action.payload,
      searchBoxSuggestedStoreUpdateTime: new Date().getTime(),
    };
  },
  [types.CLEAN_SUGGESTIONS]: state => {
    return {
      ...state,
      searchBoxSuggestedList: [],
    };
  },
  [types.SELECT_SUGGESTION_PLACE]: (state, action) => {
    return {
      ...initialState,
      selectedPlace: { ...action.payload },
    };
  },
});

export default { searchBoxReducer };
