import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ProductsContainer from './ProductsContainer.jsx';
import CartContainer from './CartContainer.jsx';

import styles from './App.less';

@DragDropContext(HTML5Backend)
export default class App extends Component {
    render() {
        return (
            <div>
                <h1 className={styles.heading}>Shopping Cart</h1>

                <div className={styles.app}>
                    <div className={styles.column__8}>
                        <ProductsContainer />
                    </div>

                    <div className={styles.column__4}>
                        <CartContainer />
                    </div>
                </div>

                <ReduxToastr
                    position="top-right"
                    preventDuplicates={true}
                    timeOut={2000}
                    transitionIn="bounceIn"
                    transitionOut="bounceOut"
                />
            </div>
        );
    }
}
