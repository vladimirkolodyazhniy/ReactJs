import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import PhoneBookApp from './components/PhoneBookApp.jsx';

import store from './store';

// styles
import 'normalize.css';
import './assets/main.css';

ReactDOM.render(
    <Provider store={store}>
        <PhoneBookApp />
    </Provider>,
    document.getElementById('root')
);
