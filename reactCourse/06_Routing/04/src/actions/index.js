import api from '../api';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_RECOMENDATION_SUCCESS = 'FETCH_MOVIE_RECOMENDATION_SUCCESS';
export const FETCH_MOVIE_SIMILAR_SUCCESS = 'FETCH_MOVIE_SIMILAR_SUCCESS';
export const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE';

export const fetchMoviesRequest = () => ({
    type: FETCH_MOVIES_REQUEST
});

export const fetchMoviesSuccess = ({ data }) => ({
    ...data,
    type: FETCH_MOVIES_SUCCESS
});

export const fetchMovieRequest = () => ({
    type: FETCH_MOVIE_REQUEST
});

export const fetchMovieSuccess = ({ data }) => ({
    movie: data,
    type: FETCH_MOVIE_SUCCESS
});

export const fetchMovieRecomendationSuccess = ({ data }) => ({
    ...data,
    type: FETCH_MOVIE_RECOMENDATION_SUCCESS
});

export const fetchMovieSimilarSuccess = ({ data }) => ({
    ...data,
    type: FETCH_MOVIE_SIMILAR_SUCCESS
});

export const searchMovies = query => dispatch => {
    dispatch(fetchMoviesRequest(query));

    return api.searchMovies(query)
        .then(data => dispatch(fetchMoviesSuccess(data)));
};

export const fetchMoviesByType = type => dispatch => {
    dispatch(fetchMoviesRequest());

    return api.fetchMoviesByType(type)
        .then(data => dispatch(fetchMoviesSuccess(data)));
};

export const fetchMovie = id => dispatch => {
    dispatch(fetchMovieRequest(id));

    return api.fetchMovie(id)
        .then(data => dispatch(fetchMovieSuccess(data)));
};

export const fetchMovieRecomendation = (id, path) => dispatch => {
    dispatch(fetchMoviesRequest());

    return api.fetchMovie(id, path)
        .then(data => dispatch(fetchMovieRecomendationSuccess(data)));
};

export const fetchMovieSimilar = (id, path) => dispatch => {
    dispatch(fetchMoviesRequest());

    return api.fetchMovie(id, path)
        .then(data => dispatch(fetchMovieSimilarSuccess(data)));
};
