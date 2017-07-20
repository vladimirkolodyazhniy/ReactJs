import { expect } from 'chai';

import { receiveProducts, addToCart, cartCheckout, RECEIVE_PRODUCTS, ADD_TO_CART, CHECKOUT_SUCCESS } from '../index';

describe('actions', () => {
    describe('#receiveProducts', () => {
        it('should create an action to receive products', () => {
            const mockedItems = [{
                id: 1,
                title: 'iPad 4 Mini',
                price: 500.01,
                inventory: 2,
                imgSrc: 'http://www.jamesbartley.co.uk/wp-content/uploads/2016/07/placeholder.png'
            }];

            const expectedAction = { type: RECEIVE_PRODUCTS,  products: mockedItems };

            const action = receiveProducts(mockedItems);

            expect(action).to.eql(expectedAction);
        });
    });

    describe('#addToCart', () => {
        it('should create an action to add to cart', () => {
            const productId = 1;

            const action = addToCart(productId);

            expect(action).to.eql({
                type: ADD_TO_CART,
                productId
            });
        });
    });

    describe('#cartCheckout', () => {
        it('should create an action to cart checkout', () => {

            const action = cartCheckout();

            expect(action).to.eql({ type: CHECKOUT_SUCCESS });
        });
    });
});
