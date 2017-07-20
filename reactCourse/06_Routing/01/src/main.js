import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import App from './containers/App.jsx';
import StudentsFeed from './containers/StudentsFeed.jsx';
import Student from './containers/Student.jsx';

import './assets/main.scss';

const routes = (
    <Route component={App}>
        <Redirect from="/" to="students" />
        <Route component={StudentsFeed} path="students" />
        <Route component={Student} path="students/:id" />
        <Route component={() => <h1>Oooops! Looks like this page does not exist!</h1>} path="*" />
    </Route>
);

ReactDOM.render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('root')
);
