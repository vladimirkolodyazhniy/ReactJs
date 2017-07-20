import React, { Component } from 'react';

import styles from './NoteEditor.less';

import ColorPicker from './ColorPicker.jsx';

export default class NoteEditor extends Component {
    constructor(props) {
        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    state = {
        title: '',
        text: '',
        color: '#FD8A81'
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    handleColorChange(color){
        this.setState({ color });
    }

    handleNoteAdd() {
        const { title, text, color } = this.state;

        this.props.onNoteAdd({ title, text, color });

        this.setState({
            title: '',
            text: '',
            color: '#FD8A81'
        });
    }

    render() {
        const {
            title,
            text,
            color
        } = this.state;

        return (
            <div className={styles.editor}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Enter note title"
                    value={title}
                    onChange={this.handleTitleChange}
                />

                <textarea
                    rows={5}
                    placeholder="Enter your note here..."
                    className={styles.textarea}
                    value={text}
                    onChange={this.handleTextChange}
                />

                <div className={styles.footer}>
                    <ColorPicker
                        selectedColor={color}
                        onColorChange={this.handleColorChange}
                    />

                    <button
                        className={text.length > 0 ? styles.button : styles.disabled}
                        onClick={this.handleNoteAdd}
                    >
                    Add
                    </button>
                </div>
            </div>
        );
    }
}
