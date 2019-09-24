import {
  SWITCH_LIST_OPEN_STATE,
  RECORD_BROWSER,
  MOBILE_BROWSER_BARS_FIXER,
  RECORD_DEVICE_TYPE,
} from '../constans/actionTypes';

const INIT_STATE = {
  listOpenState: false,
  expandButtonClass: '',
  deviceHeights: {
    windowInnerHeight: '100vh',
  },
  browser: undefined,
};

const additionalExpandButtonClass = 'expand-button-on-top';

export default (state = INIT_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case SWITCH_LIST_OPEN_STATE: {
      const { expandButtonClass, listOpenState } = state;
      return {
        ...state,
        listOpenState: !listOpenState,
        expandButtonClass: expandButtonClass ? '' : additionalExpandButtonClass,
      };
    }
    case MOBILE_BROWSER_BARS_FIXER: {
      return {
        ...state,
        deviceHeights: payload,
      };
    }
    case RECORD_BROWSER: {
      return {
        ...state,
        browser: payload,
      };
    }
    case RECORD_DEVICE_TYPE: {
      return {
        ...state,
        device: payload,
      };
    }
    default:
      return state;
  }
};
