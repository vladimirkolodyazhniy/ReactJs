import { fromJS, List, Map } from 'immutable';
import { closeTiles } from '../actions';
import store from '../store';

export function generateBoard({ cols, rows, images }) {
    const imgLength = (cols * rows) / 2;

    const imgArr = fromJS(images.slice(0, imgLength));

    const cells = imgArr.concat(imgArr)
    .reduce((list, item) => (
        list.push(
            new Map({
                imgSrc: item.get('posterPath'),
                isRevealed: false
            })
        ))
        , new List()
    );

    return cells
        .sort(() => Math.random() - 0.5)
        .map((tile, idx) => tile.set('id', idx));
}

export function startGame(params) {
    const game = fromJS({
        cols: params.cols,
        board: generateBoard(params),
        moves: 0,
        memoryValue: [],
        startedAt: Date.now()
    });

    return game;
}

export function setTileRevealed(game, tileId) {
    return game.setIn(['board', tileId, 'isRevealed'], true);
}

export function updateGameMove(game) {
    return game.set('moves', game.get('moves') + 1);
}

export function setMemoryValues(game, tileId, imgSrc) {
    const updatedGame = game.updateIn(['memoryValue'], val => val.push(new Map({tileId, imgSrc})));

    return setTileRevealed(updatedGame, tileId);
}

export function resetMemoryValues(game) {
    const updatedGame = game.set('memoryValue', new List());

    return updateGameMove(updatedGame);
}

export function resetTileRevealed(game) {
    const tileIdFirst = game.getIn(['memoryValue', 0, 'tileId']);
    const tileIdSecond = game.getIn(['memoryValue', 1, 'tileId']);

    const updatedGame = game
        .setIn(['board', tileIdFirst, 'isRevealed'], false)
        .setIn(['board', tileIdSecond, 'isRevealed'], false);

    return resetMemoryValues(updatedGame);
}

export function revealTile(game, tileId) {
    const imgSrc = game.getIn(['board', tileId, 'imgSrc']);

    if (game.get('memoryValue').size < 2) {
        const updatedGame = setMemoryValues(game, tileId, imgSrc);

        if (updatedGame.get('memoryValue').size === 2) {
            const memoryImgFirst = updatedGame.getIn(['memoryValue', 0, 'imgSrc']);
            const memoryImgSecond = updatedGame.getIn(['memoryValue', 1, 'imgSrc']);

            if (memoryImgFirst === memoryImgSecond) {
                return resetMemoryValues(updatedGame);
            }

            setTimeout(() => store.dispatch(closeTiles(updatedGame)), 1000);
        }

        return updatedGame;
    }

    return game;
}


export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
