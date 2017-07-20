import React, { PropTypes } from 'react';

import styles from './StateManager.less';

const StateManager = props => (
    <div className={styles.root}>
        <button className={styles.btn} onClick={props.undo}>Undo</button>
        <button className={styles.btn} onClick={props.redo}>Redo</button>
    </div>
);

StateManager.propTypes = {
    undo: PropTypes.func,
    redo: PropTypes.func
};

export default StateManager;
