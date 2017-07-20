import React, { Component } from 'react';

import TodoList from './TodoList.jsx';
import AddTodo from './AddTodo.jsx';
import Footer from './Footer.jsx';

import styles from './TodoApp.less';

export default class TodoApp extends Component {
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.container}>
                    <h2 className={styles.header}>To do</h2>

                    <div className={styles.app}>
                        <AddTodo />
                        <TodoList />
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}
