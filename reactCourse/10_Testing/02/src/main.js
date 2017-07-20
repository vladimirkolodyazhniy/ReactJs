import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import App from './containers/App.jsx';

import store from './store';

import 'normalize.css';
import './assets/variables.less';
import './assets/main.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
