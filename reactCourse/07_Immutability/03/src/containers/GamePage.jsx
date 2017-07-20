import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isLoading } from '../selectors';

import * as actions from '../actions';

import GameBoard from './GameBoard.jsx';
import GameStatus from './GameStatus.jsx';
import Loader from '../components/Loader.jsx';
import Footer from '../components/Footer.jsx';

@connect(
    mapStateToProps,
    actions
)
export default class Game extends Component {
    static propTypes = {
        prepareGame: PropTypes.func.isRequired,
        loading: PropTypes.bool
    }

    componentDidMount() {
        this.props.prepareGame();
    }

    render() {
        return (
            <Loader loading={this.props.loading}>
                <div className="game-holder">
                    <GameStatus />
                    <GameBoard />
                    <Footer />
                </div>
            </Loader>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: isLoading(state)
    };
}
