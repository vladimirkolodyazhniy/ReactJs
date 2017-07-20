import {
    REQUEST_MOVIES,
    RECEIVE_MOVIES,
    LOAD_MORE_MOVIES
} from '../actions';

export default function movies( state = { isFetching: false, isFirstFetch: false, items: [], currentPage: 0, totalPages: 0 }, action) {
    switch (action.type) {
        case REQUEST_MOVIES: {
            return {
                ...state,
                isFetching: true,
                isFirstFetch: action.isFirstFetch || false
            };
        }

        case RECEIVE_MOVIES: {
            return {
                ...state,
                isFetching: false,
                isFirstFetch: false,
                items: action.movies,
                currentPage: action.currentPage,
                totalPages: action.totalPages
            };
        }

        case LOAD_MORE_MOVIES: {
            return {
                ...state,
                isFetching: false,
                items: [...state.items, ...action.movies],
                currentPage: action.currentPage
            };
        }

        default: {
            return state;
        }
    }
}
