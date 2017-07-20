import { createStore, applyMiddleware  } from 'redux';

import rootReducer from '../reducers';

import { loadState } from '../utils/localStorage';

import { localStorageMiddleware } from '../middlewares/storage';
import { gaMiddleware } from '../middlewares/googleAnalytics';

const persistedState = loadState();

export default createStore(rootReducer, persistedState, applyMiddleware(localStorageMiddleware, gaMiddleware));
