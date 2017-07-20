import React, { Component } from 'react';

import CounterList from './CounterList.jsx';
import AddCounter from './AddCounter.jsx';

import styles from './CounterApp.css';

export default class CounterApp extends Component {
    render() {
        return (
            <div className={styles.counterApp}>
                <CounterList />
                <AddCounter />
            </div>
        );
    }
}
