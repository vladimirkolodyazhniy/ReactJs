import React from 'react';

import styles from './Status.less';

export default props => {
    const { status } = props;

    return (
        <div className={styles.base}>
            {status}
        </div>
    );
};
