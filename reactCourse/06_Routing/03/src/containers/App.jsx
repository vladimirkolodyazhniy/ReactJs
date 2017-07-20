import React from 'react';
import { Link } from 'react-router';

import styles from './App.less';

const App = props => (
    <div className={styles.app}>
        <ul className={styles.tabs}>
            <li><Link activeClassName={styles.active} to="/about">About</Link></li>
            <li><Link activeClassName={styles.active} to="/inbox">Inbox</Link></li>
        </ul>

        {props.children}
    </div>
);

App.propTypes = {
    children: React.PropTypes.element
};

export default App;
