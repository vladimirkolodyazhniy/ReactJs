import React, { Component } from 'react';

import styles from './Note.less';

export default class Note extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.id);
    }

    render() {
        const {
            color,
            title,
            text
        } = this.props;

        return (
            <div className={styles.note} style={{ backgroundColor: color }}>
                <span className={styles.delete_icon} onClick={this.handleDelete}> × </span>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        );
    }
}
