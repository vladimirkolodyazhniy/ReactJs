import React, { Component } from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from '../actions';

import Counter from './Counter.jsx';

@connect(mapStateToProps, { increment, decrement })
export default class CounterList extends Component {
    render() {
        const {
            counters,
            increment,
            decrement
        } = this.props

        return (
            <div>
                {
                    counters.map(counter =>
                        <Counter
                            key={counter.id}
                            id={counter.id}
                            count={counter.count}
                            increment={increment}
                            decrement={decrement}
                        />
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        counters: state
    }
}
