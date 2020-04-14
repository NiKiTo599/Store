import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { reducer, reducerCart, reducerSortSection } from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewres = [thunkMiddleware];

const enhancer = composeEnhancers(applyMiddleware(...middlewres));

const rootReducer = combineReducers({ reducer, reducerCart, reducerSortSection });

const store = createStore(rootReducer, enhancer);

export default store;