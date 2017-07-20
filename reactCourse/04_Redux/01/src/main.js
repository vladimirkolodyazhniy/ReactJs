import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import CounterApp from './components/CounterApp.jsx';

import store from './store';

import './assets/main.css';

ReactDOM.render(
    <Provider store={store}>
        <CounterApp />
    </Provider>,
    document.getElementById('root')
);
