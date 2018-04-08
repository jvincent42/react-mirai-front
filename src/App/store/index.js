import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line

import { isDev } from 'utils';

import { authReducer } from '../auth';


const middlewares = [
];
const appliedMiddlewares = applyMiddleware(...middlewares);

const reducer = combineReducers({
  auth: authReducer,
});


const store = createStore(
  reducer,
  isDev() ? composeWithDevTools(appliedMiddlewares) : appliedMiddlewares,
);


export default store;
