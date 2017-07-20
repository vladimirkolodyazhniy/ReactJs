import api from '../api/shop';

import { actions as toastrActions } from 'react-redux-toastr';

export const ADD_TO_CART = 'ADD_TO_CART';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const receiveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products
});

export const loadAllProducts = () => dispatch => {
    api.getProducts(products => dispatch(receiveProducts(products)));
};

export const addToCart = productId => ({
    type: ADD_TO_CART,
    productId
});

export const cartCheckout = () => ({ type: CHECKOUT_SUCCESS });

export const checkout = products => dispatch => {
    api.buyProducts(products, () => {
        dispatch(
            toastrActions.add({
                type: 'success',
                title: 'Cart',
                message: 'Your Order was completed successfuly.',
                options: {
                    showCloseButton: true,
                    removeOnHover: true
                }
            })
        );

        dispatch(cartCheckout());
    });
};
