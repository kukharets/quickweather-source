import {
  SWITCH_LIST_OPEN_STATE,
  RECORD_BROWSER,
  MOBILE_BROWSER_BARS_FIXER,
  RECORD_DEVICE_TYPE,
} from '../constans/actionTypes';

export const switchListOpenState = () => async dispatch => {
  dispatch({
    type: SWITCH_LIST_OPEN_STATE,
  });
};

export const actionRecordBrowser = payload => async dispatch => {
  dispatch({
    type: RECORD_BROWSER,
    payload,
  });
};

export const actionMobileBrowserBarsFixer = payload => async dispatch => {
  dispatch({
    type: MOBILE_BROWSER_BARS_FIXER,
    payload,
  });
};

export const actionRecordDeviceType = payload => async dispatch => {
  dispatch({
    type: RECORD_DEVICE_TYPE,
    payload,
  });
};
