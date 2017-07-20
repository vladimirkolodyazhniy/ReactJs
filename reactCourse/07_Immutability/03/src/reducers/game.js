import { startGame, revealTile, resetTileRevealed } from '../utils/memorize';

import {
    START_GAME,
    REVEAL_TILE,
    CLOSE_TILE,
    FETCH_IMAGES_REQUEST,
    DEFAULT_GAME_STATE
} from '../config';

export default (state = DEFAULT_GAME_STATE, action) => {
    switch (action.type) {
        case FETCH_IMAGES_REQUEST: {
            return state.set('isFetching', true);
        }

        case START_GAME: {
            const { rows, cols, results } = action;

            return startGame({ rows, cols, images: results });
        }

        case REVEAL_TILE: {
            return revealTile(state, action.tileId);
        }

        case CLOSE_TILE: {
            return resetTileRevealed(state);
        }

        default: {
            return state;
        }
    }
};
