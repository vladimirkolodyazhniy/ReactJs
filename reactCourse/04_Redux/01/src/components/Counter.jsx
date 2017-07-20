import React, { Component } from 'react';

import styles from './Counter.css';

export default class Counter extends Component {
    constructor(props) {
        super(props);

        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
    }

    handleDecrement() {
        this.props.decrement(this.props.id);
    }

    handleIncrement() {
        this.props.increment(this.props.id);
    }

    render() {
        const { count } = this.props;

        return (
            <div className={styles.counter}>
                <button className={styles.counter_minus} onClick={this.handleDecrement}>-1</button>
                <span className={styles.value}>{count}</span>
                <button className={styles.counter_plus} onClick={this.handleIncrement}>+1</button>
            </div>
        );
    }
}
