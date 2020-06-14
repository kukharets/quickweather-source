import * as types from './types';

export const recordDeviceType = payload => ({
  type: types.RECORD_DEVICE_TYPE,
  payload,
});
