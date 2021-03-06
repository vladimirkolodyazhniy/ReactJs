import React, { Component } from 'react';

import styles from './Todo.less';

export default class Todo extends Component {
    constructor() {
        super();

        this.handleToggle = this.handleToggle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleToggle() {
        const { onToggle, id } = this.props;

        onToggle(id);
    }

    handleDelete() {
        const { onDelete, id } = this.props;

        onDelete(id);
    }

    render() {
        const { text, completed } = this.props;

        return (
            <div className={styles.root}>
                <span className={styles.delete_icon} onClick={this.handleDelete}> × </span>

                <div
                    className={completed ? styles.completed : styles.item}
                    onClick={this.handleToggle}
                >
                    {text}
                </div>
            </div>
        );
    }
}
