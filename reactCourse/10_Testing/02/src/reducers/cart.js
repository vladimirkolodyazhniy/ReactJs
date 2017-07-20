import { ADD_TO_CART, CHECKOUT_SUCCESS } from '../actions';

export default function cart( state = {}, action) {
    switch (action.type) {
        case ADD_TO_CART: {
            const { productId } = action;

            return {
                ...state,
                [productId]: (state[productId] || 0) + 1
            };
        }

        case CHECKOUT_SUCCESS: {
            return {};
        }

        default: {
            return state;
        }
    }
}
