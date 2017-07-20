import React, { Component } from 'react';

import ViewType from './ViewType.jsx';

import styles from './ViewTypesList.less';

export default class ViewTypeList extends Component {
    render() {
        return (
            <div className={styles.root}>
                <ViewType viewType="list"><i className="fa fa-th-list" aria-hidden="true" /></ViewType>
                <ViewType viewType="grid"><i className="fa fa-th" aria-hidden="true" /></ViewType>
            </div>
        );
    }
}
