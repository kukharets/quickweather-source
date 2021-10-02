import * as types from './types';
import history from '../../../utils/history';

export const actionSelectPlace = place => {
  if (place && place.placeID) {
    history.push(`?${place.placeID}`);
  } else {
    history.push('');
  }
  return {
    type: types.SELECT_PLACE,
    payload: place,
  };
};

export const actionUnselectPlace = () => ({
  type: types.UNSELECT_PLACE,
});

export const actionSavePlace = place => ({
  type: types.SAVE_PLACE,
  payload: place,
});

export const actionRemovePlace = placeID => ({
  type: types.REMOVE_PLACE,
  payload: placeID,
});

export const actionSwitchListOpenState = () => ({
  type: types.SWITCH_LIST_OPEN_STATE,
});
