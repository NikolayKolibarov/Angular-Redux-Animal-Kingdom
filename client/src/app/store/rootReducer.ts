import { combineReducers } from 'redux';

import { IAppState } from './IAppState';

import authenticationReducer from './authentication';
import animalsReducer from './animals';

const reducers = {
  authentication: authenticationReducer,
  animals: animalsReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;

