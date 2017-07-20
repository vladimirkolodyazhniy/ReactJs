import React from 'react';
import { Link } from 'react-router';

import styles from './Filters.less';

const Filters = () => (
    <div className={styles.root}>
        <span className={styles.item}>
            <Link activeClassName={styles.active} to={{ pathname: '/', query: { filter: 'show_all' } }}>All</Link>
        </span>
        <span className={styles.item}>
            <Link activeClassName={styles.active} to={{ pathname: '/', query: { filter: 'show_new' } }}>New</Link>
        </span>
        <span className={styles.item}>
            <Link activeClassName={styles.active} to={{ pathname: '/', query: { filter: 'show_completed' } }}>Completed</Link>
        </span>
    </div>
);

export default Filters;
