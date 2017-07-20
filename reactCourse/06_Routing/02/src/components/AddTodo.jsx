import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo, completeAllTodos } from '../actions';

import styles from './AddTodo.less';

@connect(null, { addTodo, completeAllTodos })
export default class AddTodo extends Component {
    static propTypes = {
        addTodo: React.PropTypes.func,
        completeAllTodos: React.PropTypes.func
    }

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.addTodo(this.input.value);
    }

    render() {
        return (
            <div>
                <form className={styles.root} onSubmit={this.handleSubmit}>
                    <span
                        className={styles.icon_check_all}
                        onClick={this.props.completeAllTodos}
                    />

                    <input
                        className={styles.input}
                        placeholder="What needs to be done?"
                        ref={c => this.input = c}
                        type="text"
                    />
                </form>
            </div>
        );
    }
}
