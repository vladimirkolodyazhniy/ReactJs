import { expect } from 'chai';

import {
    getProduct,
    getCartProducts,
    getTotal
} from '../index';

describe('selectors', () => {
    describe('#getProducts()', () => {
        it('should return a product by id', () => {
            const state = {
                products: [
                    {
                        id: 1,
                        title: 'iPad 4 Mini',
                        price: 500.01
                    },
                    {
                        id: 2,
                        title: 'iPad 3 Mini',
                        price: 400.01
                    },
                    {
                        id: 3,
                        title: 'iPad 2 Mini',
                        price: 200.01
                    }
                ]
            };

            const selected = getProduct(state, 1);

            expect(selected).to.be.an.instanceof(Object);
            expect(selected).to.eql({
                id: 1,
                title: 'iPad 4 Mini',
                price: 500.01
            });
        });

        it('should return undefined if id does not match state', () => {
            const state = {
                products: [
                    {
                        id: 1,
                        title: 'iPad 4 Mini',
                        price: 500.01
                    },
                    {
                        id: 2,
                        title: 'iPad 3 Mini',
                        price: 400.01
                    }
                ]
            };

            const selected = getProduct(state, '5');

            expect(selected).to.be.undefined;
        });
    });

    describe('#getCartProducts()', () => {
        it('should return list of products with quantity prop', () => {
            const state = {
                products: [
                    {
                        id: 2,
                        title: 'iPad 3 Mini',
                        price: 400.01
                    }
                ],
                cart: {
                    2: 1
                }
            };

            const selected = getCartProducts(state);

            expect(selected).to.be.an.instanceof(Array);
            expect(selected).to.eql([
                {
                    id: 2,
                    title: 'iPad 3 Mini',
                    price: 400.01,
                    quantity: 1
                }
            ]);
        });

        it('should return list epty list if cart object is empty', () => {
            const state = {
                products: [
                    {
                        id: 2,
                        title: 'iPad 3 Mini',
                        price: 400.01
                    }
                ],
                cart: {}
            };

            const selected = getCartProducts(state);

            expect(selected).to.be.an.instanceof(Array);
            expect(selected).to.be.empty;
        });
    });

    describe('#getTotal()', () => {
        it('should return sum of list props', () => {
            const state = {
                products: [
                    {
                        id: 2,
                        title: 'iPad 3 Mini',
                        price: 400
                    },
                    {
                        id: 1,
                        title: 'iPad 5 Mini',
                        price: 600
                    }
                ],
                cart: {
                    1: 2,
                    2: 1
                }
            };

            const selected = getTotal(state);

            expect(selected).to.be.a.number;
            expect(selected).to.equal(1600.00);
        });

        it('should return 0 if list is empty', () => {
            const state = {
                products: [],
                cart: {}
            };

            const selected = getTotal(state);

            expect(selected).to.be.a.number;
            expect(selected).to.equal(0);
        });
    });
});
