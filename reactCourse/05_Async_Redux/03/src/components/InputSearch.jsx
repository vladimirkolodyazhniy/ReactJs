import React, { Component } from 'react';

import styles from './InputSearch.less';

const ENTER_KEY = 13;

export default class InputSearch extends Component {
    constructor() {
        super();

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleTextChange(e) {
        this.props.onQueryChange(e.target.value);
    }

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.props.onKeyDown();
        }
    }

    render() {
        const { value } = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.search_holder}>
                    <span className={styles.icon_search}><i className="fa fa-search" aria-hidden="true" /></span>
                    <input
                        type="text"
                        placeholder="Найти фильм, сериал, актера..."
                        value={value}
                        className={styles.input}
                        onChange={this.handleTextChange}
                        onKeyDown={this.handleKeyDown}
                    />
                </div>
            </div>
        );
    }
}
