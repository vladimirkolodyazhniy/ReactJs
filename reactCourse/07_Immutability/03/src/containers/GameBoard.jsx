import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getGameBoard } from '../selectors';

import * as actions from '../actions';

import Board from '../components/Board.jsx';

@connect(
    mapStateToProps,
    actions
)
export default class GameBoard extends Component {
    static propTypes = {
        board: PropTypes.object,
        revealTile: PropTypes.func,
        loading: PropTypes.bool
    }

    render() {
        const { board, revealTile } = this.props;

        return (
            <Board
                rows={board}
                onReveal={revealTile}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        board: getGameBoard(state)
    };
}
