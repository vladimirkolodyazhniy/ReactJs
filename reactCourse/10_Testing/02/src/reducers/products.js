import { RECEIVE_PRODUCTS, ADD_TO_CART } from '../actions';

export default function products( state = [], action) {
    switch (action.type) {
        case RECEIVE_PRODUCTS: {
            return [
                ...action.products
            ];
        }

        case ADD_TO_CART: {
            return state.map(item => {
                if (item.id !== action.productId) {
                    return item;
                }

                return {
                    ...item,
                    inventory: item.inventory > 0 ? item.inventory - 1 : 0
                };
            });
        }

        default: {
            return state;
        }
    }
}
