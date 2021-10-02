import { all } from 'redux-saga/effects';
import googleApiSaga from './googleApi/sagas';
import ducksConnectorSaga from './ducksConnectorSaga';
import weatherSaga from './weather/sagas';

export function* rootSaga() {
  yield all([googleApiSaga(), weatherSaga(), ducksConnectorSaga()]);
}

export { default as googleApi } from './googleApi/reducers';
export { default as common } from './common/reducers';
export { default as searchBox } from './searchBox/reducers';
export { default as placeItem } from './places/reducers';
export { default as weatherReducer } from './weather/reducers';
