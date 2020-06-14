import * as types from './types';
import history from '../../../utils/history';

export const actionSelectPlace = place => {
  if (place && place.place_id) {
    history.push(`?${place.place_id}`);
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

export const actionRemovePlace = place_id => ({
  type: types.REMOVE_PLACE,
  payload: place_id,
});

export const switchListOpenState = () => ({
  type: types.SWITCH_LIST_OPEN_STATE,
});
