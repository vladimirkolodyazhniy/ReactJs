import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Todos from './containers/Todos.jsx';
import App from './containers/App.jsx';

import store from './store';

// styles
import 'normalize.css';
import './assets/main.css';

const routes = (
    <Route component={App} path="/">
        <IndexRoute component={Todos} />
        <Route component={() => <h1>Oooops! Looks like this page does not exist!</h1>} path="*" />
    </Route>
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);
