import React, { PropTypes, Component } from 'react';

import Button from './Button.jsx';

import styles from './ProductItem.less';

export default class ProductItem extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired,
        onAddToCart: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    handleAddToCart() {
        const { id, onAddToCart, inventory } = this.props;

        if (inventory > 0) {
            onAddToCart(id);
        }
    }

    render() {
        const { price, title, inventory, imgSrc, isDragging } = this.props;

        const hasInventory = inventory > 0;

        const draggingClass = isDragging ? styles.isDragging : styles.root;

        return (
            <div className={hasInventory ? draggingClass : styles.disabled}>
                <div className={styles.item}>
                    <div className={styles.media}>
                        <img alt={title} className={styles.img} src={imgSrc} />
                    </div>

                    <div className={styles.content}>
                        <h3>{title}</h3>
                        <strong>Price: <em>${price}</em></strong>
                        <span> x {inventory}</span>
                    </div>
                </div>

                <Button
                    customClass={hasInventory ? 'btnSuccess' : 'btnSuccessDisabled'}
                    text={hasInventory ? 'Add to cart' : 'Sold Out'}
                    onButtonClick={this.handleAddToCart}
                />
            </div>
        );
    }
}
