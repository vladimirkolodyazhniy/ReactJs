import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = props => (
    <MuiThemeProvider>
        <div>
            {props.children}
        </div>
    </MuiThemeProvider>
);

App.propTypes = {
    children: PropTypes.element
};

export default App;
