import { combineReducers } from 'redux';

import searchQuery from './searchQuery';
import movies from './movies';

export default combineReducers({ movies, searchQuery });
