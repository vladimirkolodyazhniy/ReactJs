import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCounter } from '../actions';

import styles from './AddCounter.css';

@connect(undefined, { addCounter })
export default class AddCounter extends Component {
    render() {
        return (
            <div className={styles.add_counter}>
                <button className={styles.add_btn} onClick={this.props.addCounter}>Add counter</button>
            </div>
        );
    }
}
