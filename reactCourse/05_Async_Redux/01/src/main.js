import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import TodoApp from './components/TodoApp.jsx';

import store from './store';

// styles
import 'normalize.css';
import './assets/main.css';

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);
