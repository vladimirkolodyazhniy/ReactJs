import React, { Component } from 'react';

import styles from './Color.less';

export default class Color extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onColorChange(this.props.color);
    }

    render() {
        const { selectedColor, color } = this.props;

        return (
            <div
                className={selectedColor === color ? styles.active : styles.color}
                style={{ background: color }}
                onClick={this.handleClick}
            />
        );
    }
}
