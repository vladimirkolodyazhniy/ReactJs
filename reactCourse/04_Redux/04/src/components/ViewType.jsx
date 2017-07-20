import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setView } from '../actions';

import styles from './ViewType.less';

@connect(mapStateToProps, mapDisplatchToProps)
export default class ViewType extends Component {
    render() {
        const { isActive, children, handleViewChange } = this.props;

        if (isActive) {
            return <span className={styles.active}>{children}</span>;
        }

        return <span className={styles.root} onClick={handleViewChange}>{children}</span>;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isActive: ownProps.viewType === state.viewType
    };
}

function mapDisplatchToProps(dispatch, ownProps) {
    return {
        handleViewChange: () => dispatch(setView(ownProps.viewType))
    };
}
