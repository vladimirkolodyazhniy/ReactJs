import React from 'react';

import styles from './CartProduct.less';

const CartProduct = ({ price, quantity, title }) => (
    <div className={styles.root}>
        <h3>{title}</h3>
        <strong> {quantity} x </strong>

        <em> ${price} </em>
    </div>
);

export default CartProduct;
