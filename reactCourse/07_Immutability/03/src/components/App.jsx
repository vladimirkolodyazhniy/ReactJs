import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './App.less';

export default props => (
    <MuiThemeProvider>
        <div className={styles.base}>
            {props.children}
        </div>
    </MuiThemeProvider>
);
