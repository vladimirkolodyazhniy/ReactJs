import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addContact } from '../actions';

import styles from './AddContact.less';

@connect(undefined, { addContact })
export default class AddContact extends Component {
    constructor() {
        super();

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        name: "",
        email: ""
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleClick() {
        this.props.addContact(this.state.name, this.state.email);

        this.setState({
            name: "",
            email: ""
        });
    }

    render() {
        return (
            <div className={styles.root}>
                <input
                    className={styles.input_large}
                    type="text"
                    placeholder="Введите имя..."
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />

                <div className="flex-container">
                    <div className="flex-column">
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="Введите e-mail..."
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    <div className="flex-column">
                        <button
                            onClick={this.handleClick}
                            className={styles.add_btn}
                        >
                        Создать
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
