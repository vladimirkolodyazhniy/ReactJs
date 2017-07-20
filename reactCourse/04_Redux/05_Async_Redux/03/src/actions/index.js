import api from '../api';

export const SELECT_QUERY = 'SELECT_QUERY';
export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
export const LOAD_MORE_MOVIES = 'LOAD_MORE_MOVIES';

export const changeQuery = query => ({
    type: SELECT_QUERY,
    query
});

export const fetchMovies = query => dispatch => {
    if ( query.length === 0) {
        return false;
    }

    dispatch({
        type: REQUEST_MOVIES,
        isFirstFetch: true
    });

    return api.getMovies(query)
        .then(data => dispatch({
            type: RECEIVE_MOVIES,
            movies: data.data.results,
            currentPage: data.data.page,
            totalPages: data.data.total_pages
        }));
};

export const fetchMoreMovies = (query, page) => dispatch => {
    if ( query.length === 0) {
        return false;
    }

    dispatch({ type: REQUEST_MOVIES });

    return api.getMovies(query, page)
        .then(data => dispatch({
            type: LOAD_MORE_MOVIES,
            movies: data.data.results,
            currentPage: data.data.page
        }));
};
