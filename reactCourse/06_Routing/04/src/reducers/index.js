import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import {
    FETCH_MOVIES_REQUEST,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIE_REQUEST,
    FETCH_MOVIE_SUCCESS,
    FETCH_MOVIE_RECOMENDATION_SUCCESS,
    FETCH_MOVIE_SIMILAR_SUCCESS
} from '../actions';

const movies = ( state = { isFetching: false, items: [] }, action) => {
    switch (action.type) {
        case FETCH_MOVIES_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.results
            };
        default:
            return state;
    }
};

const movie = ( state = { isFetching: false, info: {}, recommendations: [] }, action) => {
    switch (action.type) {
        case FETCH_MOVIE_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_MOVIE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                info: action.movie
            };
        default:
            return state;
    }
};

const recomendations = ( state = { isFetching: false, items: [] }, action) => {
    switch (action.type) {
        case FETCH_MOVIES_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_MOVIE_RECOMENDATION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.results
            };
        default:
            return state;
    }
};

const similar = ( state = { isFetching: false, items: [] }, action) => {
    switch (action.type) {
        case FETCH_MOVIES_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_MOVIE_SIMILAR_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.results
            };
        default:
            return state;
    }
};

export default combineReducers({ movies, movie, recomendations, similar, routing });
