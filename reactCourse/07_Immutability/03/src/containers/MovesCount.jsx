import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getMovesCount } from '../selectors';

import GameStatItem from '../components/GameStatItem.jsx';

@connect(mapStateToProps)
export default class MovesCount extends Component {
    static propTypes = {
        moves: PropTypes.number
    }

    render() {
        return <GameStatItem label="Moves" stat={this.props.moves} />;
    }
}

function mapStateToProps(state) {
    return {
        moves: getMovesCount(state)
    };
}
