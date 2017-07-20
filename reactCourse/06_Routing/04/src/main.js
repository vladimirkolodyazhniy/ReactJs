import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App.jsx';
import Search from './containers/Search.jsx';
import Movie from './containers/Movie.jsx';
import MovieSimilar from './containers/MovieSimilar.jsx';
import MovieRecommendations from './containers/MovieRecommendations.jsx';
import MoviesByType from './containers/MoviesByType.jsx';

import store from './store';

import 'normalize.css';
import './assets/main.css';

const routes = (
    <Route component={App}>
        <Redirect from="/" to="movies" />
        <Route component={Search} path="movies">
            <Route component={MoviesByType} path="popular" />
            <Route component={MoviesByType} path="top_rated" />
            <Route component={MoviesByType} path="now_playing" />
        </Route>
        <Route component={Movie} path="movies/:id">
            <Route component={MovieRecommendations} path="recommendations" />
            <Route component={MovieSimilar} path="similar" />
        </Route>
    </Route>
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);
