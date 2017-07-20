import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleTodo, deleteTodo } from '../actions';

import Todo from './Todo.jsx';

@connect(mapStateToProps, { toggleTodo, deleteTodo })
export default class TodoList extends Component {
    render() {
        const { toggleTodo, deleteTodo } = this.props;
        return (
            <div className="base">
                {
                    this.props.todos.map(todo =>
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            text={todo.text}
                            completed={todo.completed}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    )
                }
            </div>
        );
    }
}

function getVisibleTodos(todos, filter) {
    switch (filter) {
        case 'SHOW_ALL':
          return todos;

        case 'SHOW_COMPLETED':
          return todos.filter(todo => todo.completed);

        case 'SHOW_NEW':
          return todos.filter(todo => !todo.completed);
    }
}

function mapStateToProps(state) {
    return {
        todos: getVisibleTodos(state.todos, state.filter)
    };
}
