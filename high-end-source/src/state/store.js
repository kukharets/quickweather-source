import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {
  googleApi,
  common,
  searchBox,
  placeItem,
  rootSaga,
  weatherReducer,
} from './ducks';

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState) {
  const rootReducer = combineReducers({
    ...googleApi,
    ...common,
    ...placeItem,
    ...searchBox,
    ...weatherReducer,
  });

  if (process.env.REACT_APP_MODE === 'DEV') {
    return createStore(rootReducer, initialState, applyMiddleware(logger));
  }
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );
}
const store = configureStore(window.REDUX_INITIAL_DATA);
sagaMiddleware.run(rootSaga);

export default store;
