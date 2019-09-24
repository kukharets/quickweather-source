import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import reducers from './indexReducer';

const index = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk), applyMiddleware(logger)),
);

export default index;
