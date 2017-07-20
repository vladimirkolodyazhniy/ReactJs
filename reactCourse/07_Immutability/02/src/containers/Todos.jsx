import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { List } from 'immutable';
import { ActionCreators } from 'redux-undo-immutable';

import { toggleTodo, deleteTodo } from '../actions';

import Todo from '../components/Todo.jsx';
import AddTodo from '../components/AddTodo.jsx';
import Filters from '../components/Filters.jsx';
import StateManager from '../components/StateManager.jsx';

import styles from './Todos.less';

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Todos extends Component {
    static propTypes = {
        toggleTodo: PropTypes.func,
        deleteTodo: PropTypes.func,
        todos: PropTypes.instanceOf(List)
    }

    componentWillMount() {
        const { router, location, filter } = this.props;

        router.replace({
            pathname: location.pathname,
            query: { ...location.query, filter }
        });
    }

    render() {
        const { toggleTodo, deleteTodo, todos, undo, redo } = this.props;

        const todosList = todos.map(todo =>
            <Todo
                completed={todo.get('completed')}
                id={todo.get('id')}
                key={todo.get('id')}
                text={todo.get('text')}
                onDelete={deleteTodo}
                onToggle={toggleTodo}
            />
        );

        return (
            <div className={styles.root}>
                <div className={styles.container}>
                    <div className={styles.app}>
                        <AddTodo />

                        {todosList}

                        <Filters />

                        <StateManager redo={redo} undo={undo}/>
                    </div>
                </div>
            </div>
        );
    }
}

function getVisibleTodos(todos, filter) {
    switch (filter) {
        case 'show_all':
            return todos;

        case 'show_completed':
            return todos.filter(todo => todo.get('completed'));

        case 'show_new':
            return todos.filter(todo => !todo.get('completed'));
    }
}

function mapStateToProps(state, ownProps) {
    const filter = ownProps.location.query.filter || 'show_all';

    return {
        todos: getVisibleTodos(state.get('present'), filter),
        filter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTodo: (id) => dispatch(toggleTodo(id)),
        deleteTodo: (id) => dispatch(deleteTodo(id)),
        undo: () => dispatch(ActionCreators.undo()),
        redo: () => dispatch(ActionCreators.redo())
    };
}
