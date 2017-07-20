import { combineReducers } from 'redux';

import { reducer as toastrReducer } from 'react-redux-toastr';

import products from './products';
import cart from './cart';

export default combineReducers({
    products,
    cart,
    toastr: toastrReducer
});
