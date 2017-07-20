import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { checkout } from '../actions';

import { getTotal, getCartProducts } from '../selectors';

import Cart from '../components/Cart.jsx';

const CartContainer = ({ products, total, checkout }) => (
    <div>
        <Cart
            products={products}
            total={total}
            onCheckout={checkout}
        />
    </div>
);

CartContainer.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired
        })
    ).isRequired,
    total: PropTypes.number
};

const mapStateToProps = state => ({
    products: getCartProducts(state),
    total: getTotal(state)
});

export default connect(mapStateToProps, { checkout })(CartContainer);
