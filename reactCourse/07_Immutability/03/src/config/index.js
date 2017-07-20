import { fromJS } from 'immutable';

export const API_PREFIX = 'https://api.themoviedb.org/3';
export const API_KEY = '920feab675546a7c0aa9f14bc64ef606';

export const START_GAME = 'START_GAME';
export const REVEAL_TILE = 'REVEAL_TILE';
export const CLOSE_TILE = 'CLOSE_TILE';
export const FETCH_IMAGES_REQUEST = 'FETCH_IMAGES_REQUEST';

export const GAME_STATUS_WIN = 'WINNER!!!';
export const GAME_STATUS_PLAYING = 'PLAYING';

export const DEFAULT_GAME_STATE = fromJS({
    board: [],
    cols: 4,
    rows: 4,
    moves: 0,
    isFetching: false,
    images: []
});

export const NOIMAGE_URL = 'https://ticketspin.com/themes/default/img/no-image.jpg';
export const API_PREFIX_URL = 'http://image.tmdb.org/t/p/w185/';
