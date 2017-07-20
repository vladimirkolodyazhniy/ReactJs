import { expect } from 'chai';

import reducer from '../products';

import { RECEIVE_PRODUCTS, ADD_TO_CART } from '../../actions';

describe('products reducer', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {});

        expect(state).to.be.an.instanceof(Array);
        expect(state).to.be.empty;
    });

    it('should add product', () => {
        const state = reducer([], {
            type: RECEIVE_PRODUCTS,
            products: [{
                id: 1,
                title: 'iPad 4 Mini',
                price: 500.01,
                inventory: 2,
                imgSrc: 'http://www.jamesbartley.co.uk/wp-content/uploads/2016/07/placeholder.png'
            }]
        });

        expect(state).to.be.an.instanceof(Array);
        expect(state).to.have.lengthOf(1);
        expect(state).to.include(
            {
                id: 1,
                title: 'iPad 4 Mini',
                price: 500.01,
                inventory: 2,
                imgSrc: 'http://www.jamesbartley.co.uk/wp-content/uploads/2016/07/placeholder.png'
            }
        );
    });

    it('should replace initialState', () => {
        const initialState = [
            {
                id: 1,
                title: 'iPad 4 Mini',
                price: 500.01,
                inventory: 2,
                imgSrc: 'http://www.jamesbartley.co.uk/wp-content/uploads/2016/07/placeholder.png'
            }
        ];

        const state = reducer(
            initialState,
            {
                type: RECEIVE_PRODUCTS,
                products: [{
                    id: 2,
                    title: 'iPad 2',
                    price: 300.01,
                    inventory: 10,
                    imgSrc: 'http://www.jamesbartley.co.uk/wp-content/uploads/2016/07/placeholder.png'
                }]
            }
        );

        expect(state).to.be.an.instanceof(Array);
        expect(state).to.have.lengthOf(1);
        expect(state).to.have.property(0)
            .that.is.an.instanceof(Object)
            .that.eql({
                id: 2,
                title: 'iPad 2',
                price: 300.01,
                inventory: 10,
                imgSrc: 'http://www.jamesbartley.co.uk/wp-content/uploads/2016/07/placeholder.png'
            });
    });

    it('should decrease inventory by 1', () => {
        const initialState = [
            {
                id: 1,
                inventory: 2
            }
        ];

        const state = reducer(
            initialState,
            {
                type: ADD_TO_CART,
                productId: 1
            }
        );

        expect(state).to.be.an.instanceof(Array);
        expect(state).to.have.lengthOf(1);
        expect(state).to.have.property(0)
            .with.property('inventory')
            .that.equals(1);
    });

    it('should return 0 if inventory is alsready equals 0', () => {
        const initialState = [
            {
                id: 1,
                inventory: 0,
            }
        ];

        const state = reducer(
            initialState,
            {
                type: ADD_TO_CART,
                productId: 1
            }
        );

        expect(state).to.be.an.instanceof(Array);
        expect(state).to.have.lengthOf(1);
        expect(state).to.have.property(0)
            .with.property('inventory')
            .that.equals(0);
    });

    it('should return initialState if id does not match', () => {
        const initialState = [
            {
                id: 1,
                inventory: 1,
            }
        ];

        const state = reducer(
            initialState,
            {
                type: ADD_TO_CART,
                productId: 2
            }
        );

        expect(state).to.be.an.instanceof(Array);
        expect(state).to.have.lengthOf(1);
        expect(state).to.eql(initialState);
    });
});
