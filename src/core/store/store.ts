import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {rootReducer} from '../../modules/redux/reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const middlewares = [thunk, logger];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
// const currentState = store.getState();
// console.warn(currentState);
