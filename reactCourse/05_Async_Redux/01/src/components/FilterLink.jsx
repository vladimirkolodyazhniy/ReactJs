import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setFilter } from '../actions';

import styles from './FilterLink.less';

@connect(mapStateToProps, mapDisplatchToProps)
export default class FilterLink extends Component {
    render() {
        const { isActive, children, handleFilterChange } = this.props;

        if (isActive) {
            return <span className={styles.active}>{children}</span>;
        }

        return <span className={styles.root} onClick={handleFilterChange}>{children}</span>;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isActive: ownProps.filter === state.filter
    };
}

function mapDisplatchToProps(dispatch, ownProps) {
    return {
        handleFilterChange: () => dispatch(setFilter(ownProps.filter))
    };
}
