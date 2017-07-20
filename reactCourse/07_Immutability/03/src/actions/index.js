import api from '../api';

import {
    START_GAME,
    REVEAL_TILE,
    CLOSE_TILE,
    FETCH_IMAGES_REQUEST
} from '../config';

export const fetchImagesRequest = () => ({ type: FETCH_IMAGES_REQUEST });


export const startGame = ({ data }) => ({
    type: START_GAME,
    cols: 4,
    rows: 4,
    ...data
});

export const revealTile = tileId => ({
    type: REVEAL_TILE,
    tileId
});

export const closeTiles = () => ({ type: CLOSE_TILE });

export const prepareGame = () => dispatch => {
    dispatch(fetchImagesRequest());

    return api.fetchImages()
        .then(data => dispatch(startGame(data)));
};
