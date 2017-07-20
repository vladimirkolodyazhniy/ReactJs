import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import App from './containers/App.jsx';
import About from './components/About.jsx';
import Inbox from './containers/Inbox.jsx';

// styles
import 'normalize.css';
import './assets/main.css';

const routes = (
    <Route component={App}>
        <Redirect from="/" to="about" />
        <Route component={About} path="about" />
        <Route component={Inbox} path="inbox(/:id)" />
        <Route component={() => <h1>Oooops! Looks like this page does not exist!</h1>} path="*" />
    </Route>
);

ReactDOM.render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('root')
);
