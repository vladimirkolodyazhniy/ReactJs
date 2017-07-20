import React, { Component } from 'react';

import styles from './Preloader.less';

export default class Preloader extends Component {
    render() {
        return (
            <div className={styles.preloader}>
                <div className={styles.one}></div>
            </div>
        );
    }
}
