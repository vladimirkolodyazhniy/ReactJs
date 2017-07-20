import React, { Component } from 'react';

import classNames from 'classnames';
import moment from 'moment';

import NoteType from './NoteType.jsx';

import styles from './NoteEditor.css';

export default class NoteEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            moneyAmount: 0,
            date: '',
            noteSubCategory: 'other'
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.resetState = this.resetState.bind(this);
        this.handleNoteCancel = this.handleNoteCancel.bind(this);
        this.handleSubcategoryChange = this.handleSubcategoryChange.bind(this);
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleAmountChange(event) {
        this.setState({
            moneyAmount: Number(event.target.value)
        });
    }

    handleNoteAdd() {
        const newNote = {
            title: this.state.title,
            moneyAmount: this.props.noteCategory === 'expense' ? this.state.moneyAmount * -1 : this.state.moneyAmount,
            date: Date.now(),
            id: Date.now(),
            category: this.props.noteCategory,
            subCategory: this.props.noteCategory === 'expense' ? this.state.noteSubCategory : ''
        };

        this.props.onNoteAdd(newNote);
        this.props.onNoteCancel();

        this.resetState();
    }

    handleNoteCancel() {
        this.props.onNoteCancel();

        this.resetState();
    }

    resetState() {
        this.setState({
            title: '',
            moneyAmount: 0,
            date: '',
        });
    }

    handleSubcategoryChange(event) {
        this.setState({
            noteSubCategory: event.target.value
        });
    }

    render() {
        const {
            title,
            moneyAmount
        } = this.state;

        const { noteCategory } = this.props;

        return (
            <div className={styles.editor}>
                { noteCategory === 'expense' ?
                    <NoteType onSubcategoryChange={this.handleSubcategoryChange} /> : null
                }

                <div className={styles.editor_fields}>
                    <input
                        type="text"
                        className={styles.editor_input}
                        placeholder="Enter the title here..."
                        value={title}
                        onChange={this.handleTitleChange}
                        required
                    />

                    <input
                        type="number"
                        className={styles.editor_input}
                        placeholder="Enter amount of money"
                        value={moneyAmount}
                        onChange={this.handleAmountChange}
                    />
                </div>

                <div className={styles.editor_footer}>
                    <button
                        className={classNames(styles.editor_button, styles.button_default)}
                        onClick={this.handleNoteCancel}
                    >
                    Cancel
                    </button>

                    <button
                        className={styles.editor_button}
                        onClick={this.handleNoteAdd}
                    >
                    Add
                    </button>
                </div>
            </div>
        );
    }
}
