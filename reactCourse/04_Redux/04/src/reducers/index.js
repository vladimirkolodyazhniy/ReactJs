import { combineReducers } from 'redux';

import contacts from './contacts';
import filter from './filter';
import viewType from './viewType';

export default combineReducers({ contacts, filter, viewType });
