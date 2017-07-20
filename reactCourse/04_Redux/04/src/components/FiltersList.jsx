import React, { Component } from 'react';

import Filter from './Filter.jsx';

import styles from './FiltersList.less';

export default class FiltersList extends Component {
    render() {
        return (
            <div className={styles.root}>
                <Filter filter="SHOW_ALL">Все</Filter>
                <Filter filter="SHOW_FAVORITE">Избранные</Filter>
            </div>
        );
    }
}
