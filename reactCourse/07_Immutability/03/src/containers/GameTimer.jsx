import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { GAME_STATUS_PLAYING } from '../config';

import { getStartTime, getGameStatus } from '../selectors';

import GameStatItem from '../components/GameStatItem.jsx';

@connect(mapStateToProps)
export default class GameTimer extends Component {
    static propTypes = {
        startTime: PropTypes.number,
        status: PropTypes.string
    }

    constructor(props) {
        super(props);

        this.state = { elapsed: 0 };

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 50);
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    getTime() {
        return Math.round(this.state.elapsed / 1000).toFixed();
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            elapsed: new Date() - this.props.startTime || 0
        });
    }

    render() {
        const elapsed = this.getTime();

        if (this.props.status !== GAME_STATUS_PLAYING) {
            this.stopTimer();
        }

        return <GameStatItem label="Seconds" stat={elapsed} />;
    }
}

function mapStateToProps(state) {
    return {
        startTime: getStartTime(state),
        status: getGameStatus(state)
    };
}
