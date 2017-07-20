import { expect } from 'chai';

import reducer from '../cart';

import { ADD_TO_CART, CHECKOUT_SUCCESS } from '../../actions';

describe('cart reducer', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {});

        expect(state).to.be.an.instanceof(Object);
        expect(state).to.be.empty;
    });

    it('should add product id as object key', () => {
        const state = reducer({}, {
            type: ADD_TO_CART,
            productId: 1
        });

        expect(state).to.be.an.instanceof(Object);
        expect(state).to.eql({ 1: 1 });
    });

    it('should increase value if object key is equals recieved id', () => {
        const initialState = { 1: 1 };

        const state = reducer(initialState, {
            type: ADD_TO_CART,
            productId: 1
        });

        expect(state).to.be.an.instanceof(Object);
        expect(state).to.eql({ 1: 2 });
    });

    it('should add new key if recieved id is not equals existing key', () => {
        const initialState = { 1: 2 };

        const state = reducer(initialState, {
            type: ADD_TO_CART,
            productId: 2
        });

        expect(state).to.be.an.instanceof(Object);
        expect(state).to.eql({
            1: 2,
            2: 1
        });
    });

    it('should return the initial state if checkout is success', () => {
        const initialState = { 1: 1 };

        const state = reducer(initialState, {
            type: CHECKOUT_SUCCESS
        });

        expect(state).to.be.an.instanceof(Object);
        expect(state).to.be.empty;
    });
});
