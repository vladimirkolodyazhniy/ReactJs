import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AnimatedNumber from 'react-animated-number';
import { DropTarget } from 'react-dnd';

import CartProduct from './CartProduct.jsx';
import Button from './Button.jsx';

import styles from './Cart.less';

@DropTarget('item', {}, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))
export default class Cart extends Component {
    static propTypes = {
        products: PropTypes.array,
        total: PropTypes.number,
        onCheckout: PropTypes.func,
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.handleCheckout = this.handleCheckout.bind(this);
    }

    handleCheckout() {
        const { products, onCheckout } = this.props;

        if (products.length > 0) {
            onCheckout(products);
        }
    }

    render() {
        const {
            products,
            total,
            canDrop,
            isOver,
            connectDropTarget
        } = this.props;

        const productList = products.map(product =>
            <CartProduct
                key={product.id}
                price={product.price}
                quantity={product.quantity}
                title={product.title}
            />
        );

        const rootClass = canDrop && isOver ? styles.isDropActive : styles.root;

        return connectDropTarget(
            <div className={rootClass} data-qa="cart">
                <h2>Cart Summary</h2>

                <div className={styles.items}>
                    {
                        products.length > 0
                        ? <ReactCSSTransitionGroup
                            transitionAppear={true}
                            transitionAppearTimeout={500}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}
                            transitionName={{
                                enter: styles.enter,
                                enterActive: styles.enterActive,
                                appear: styles.appear,
                                appearActive: styles.appearActive
                            }}
                            >
                                {productList}
                            </ReactCSSTransitionGroup>
                        : <p><em>Use drag-n-drop or Add to cart button to add products to cart. </em></p>
                    }
                </div>

                <div className={styles.total}>
                    <div className={styles.name}>
                        Total:
                    </div>
                    <div className={styles.value}>
                        $
                        <AnimatedNumber
                            duration={600}
                            stepPrecision={2}
                            value={total}
                        />
                    </div>
                </div>

                <Button
                    customClass={products.length > 0 ? 'btnDefault' : 'disabled'}
                    text="Checkout"
                    onButtonClick={this.handleCheckout}
                />
            </div>
        );
    }
}
