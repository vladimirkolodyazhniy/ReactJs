import React, { Component } from 'react';

import classNames from 'classnames';

import styles from './FiltersPanel.css';

export default class FiltersPanel extends Component {
    static defaultProps = {
        filters: [
            {
                id: 1,
                name: 'all'
            },
            {
                id: 2,
                name: 'income'
            },
            {
                id: 3,
                name: 'expense'
            }
        ]
    }

    render() {

        const {
            filters,
            onCategoryFilter,
            activeFilter
        } = this.props;

        return (
            <div className={styles.filters_panel}>
                {
                    filters.map(filter =>
                        <span
                            key={filter.id}
                            className={classNames(styles.filters_button, filter.name === activeFilter ? styles.active : '')}
                            data-filter={filter.name}
                            onClick={onCategoryFilter}
                        >
                        {filter.name}
                        </span>
                    )
                }
            </div>
        );
    }
}
