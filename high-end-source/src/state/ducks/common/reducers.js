import * as types from './types';
import { createReducer } from '../../index';

const markupReducerInitialState = {
  windowInnerHeight: '100vh',
  layoutType: {},
};

const markupReducer = createReducer(markupReducerInitialState)({
  [types.STABLE_IOS_BROWSER_HEIGHT]: (state, action) => {
    return { ...state, windowInnerHeight: action.payload };
  },
  [types.RECORD_DEVICE_TYPE]: (state, action) => {
    return { ...state, layoutType: action.payload };
  },
});

const errorsReducer = createReducer([])({
  [types.ADD_ERROR]: (state, action) => {
    return [...state, action.payload];
  },
  [types.CLEAN_ERRORS]: () => {
    return [];
  },
});

export default {
  errorsReducer,
  markupReducer,
};
