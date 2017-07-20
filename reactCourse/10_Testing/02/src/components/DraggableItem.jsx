import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';

import ProductItem from './ProductItem.jsx';

import styles from './DraggableItem.less';

const boxSource = {
    beginDrag(props) {
        return {
            id: props.product.id,
            onAddToCart: props.onAddToCart
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();

        const dropResult = monitor.getDropResult();

        if (dropResult) {
            item.onAddToCart(item.id);
        }
    }
};

@DragSource('item', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class DraggableItem extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    }

    render() {
        const {
            connectDragSource,
            isDragging,
            product,
            onAddToCart
        } = this.props;

        return connectDragSource(
            <div className={product.inventory === 0 ? styles.disabled : null}>
                <ProductItem
                    id={product.id}
                    imgSrc={product.imgSrc}
                    inventory={product.inventory}
                    isDragging={isDragging}
                    price={product.price}
                    title={product.title}
                    onAddToCart={onAddToCart}
                />
            </div>
        );
    }
}
