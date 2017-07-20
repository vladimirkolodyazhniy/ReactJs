import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

const styles = {
    container: {
        width: '100%'
    },
    spinner: {
        margin: '24px auto',
        display: 'block'
    }
};

export default props => (
    <div style={styles.container}>
        {
            props.loading
            ? <CircularProgress size={60} style={styles.spinner} thickness={5}/>
            : props.children
        }
    </div>
);
