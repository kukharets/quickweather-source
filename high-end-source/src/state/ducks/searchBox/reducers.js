import * as types from './types';
import { createReducer } from '../../index';

const initialState = {
  searchBoxSuggestedList: [],
  searchBoxSuggestedStoreUpdateTime: 0,
  selectedSuggestion: undefined,
};

const searchBoxReducer = createReducer(initialState)({
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
      selectedSuggestion: { ...action.payload },
    };
  },
});

export default { searchBoxReducer };
