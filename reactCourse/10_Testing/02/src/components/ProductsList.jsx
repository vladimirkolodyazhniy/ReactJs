import React, { PropTypes, Component } from 'react';

import DraggableItem from './DraggableItem.jsx';

import styles from './ProductsList.less';

export default class ProductsList extends Component {
    static propTypes = {
        products: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                inventory: PropTypes.number.isRequired,
                imgSrc: PropTypes.string.isRequired
            })
        ).isRequired,
        addToCart: PropTypes.func.isRequired,
        loadAllProducts: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.props.loadAllProducts();
    }

    render() {
        const { products, addToCart } = this.props;

        return (
            <div className={styles.root} data-qa="productList">
                <h2>Products</h2>

                {
                    products.map(product => (
                        <DraggableItem
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))
                }
            </div>
        );
    }
}
