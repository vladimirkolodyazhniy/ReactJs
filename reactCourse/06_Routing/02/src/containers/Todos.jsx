import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { toggleTodo, deleteTodo } from '../actions';

import Todo from '../components/Todo.jsx';
import AddTodo from '../components/AddTodo.jsx';
import Filters from '../components/Filters.jsx';

import styles from './Todos.less';

@withRouter
@connect(mapStateToProps, { toggleTodo, deleteTodo })
export default class Todos extends Component {
    static propTypes = {
        toggleTodo: React.PropTypes.func,
        deleteTodo: React.PropTypes.func,
        todos: React.PropTypes.array
    }

    componentWillMount() {
        const { router, location, filter } = this.props;

        router.replace({
            pathname: location.pathname,
            query: { ...location.query, filter }
        });
    }

    render() {
        const { toggleTodo, deleteTodo, todos } = this.props;

        const todosList = todos.map(todo =>
            <Todo
                completed={todo.completed}
                id={todo.id}
                key={todo.id}
                text={todo.text}
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
            return todos.filter(todo => todo.completed);

        case 'show_new':
            return todos.filter(todo => !todo.completed);
    }
}

function mapStateToProps(state, ownProps) {
    const filter = ownProps.location.query.filter || 'show_all';

    return {
        todos: getVisibleTodos(state, filter),
        filter
    };
}
