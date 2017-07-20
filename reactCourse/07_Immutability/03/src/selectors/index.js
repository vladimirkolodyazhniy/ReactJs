import { List } from 'immutable';

import {
    GAME_STATUS_PLAYING,
    GAME_STATUS_WIN
} from '../config';

export const getMovesCount = state => state.getIn(['game', 'moves']);

export const isLoading = state => state.getIn(['game', 'isFetching']);

export const getStartTime = state => state.getIn(['game', 'startedAt']);

export const getGameStatus = state => {
    const isWin = state.getIn(['game', 'board']).reduce(
        (status, tile) => status && tile.get('isRevealed'),
        true
    );

    if (isWin) {
        return GAME_STATUS_WIN;
    }

    return GAME_STATUS_PLAYING;
};


export const getGameBoard = state => {
    const board = state.getIn(['game', 'board']);
    const cols = state.getIn(['game', 'cols']);

    return board.reduce((rows, cell) => {
        const rowIdx = Math.floor(cell.get('id') / cols);
        const row = rows.get(rowIdx);

        return row
            ? rows.set(rowIdx, row.push(cell))
            : rows.push(new List([cell]));
    }, new List());
};
