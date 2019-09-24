import { combineReducers } from 'redux';

import basic from './basicReducer';
import markup from './markupReducer';

export default combineReducers({
  basic,
  markup,
});
