import React, { Component } from 'react';

import Masonry from 'react-masonry-component';

import Note from './Note.jsx';

import styles from './NotesList.less';

export default class NotesList extends Component {
    render() {
        const {
            notes,
            onNoteDelete
        } = this.props;

        const masonryOptions = {
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        };

        return (
            <Masonry
                className={styles.grid}
                options={masonryOptions}
            >
                {
                    notes.map(note =>
                        <Note
                            key={note._id}
                            id={note._id}
                            color={note.color}
                            onDelete={onNoteDelete}
                            title={note.title}
                            text={note.text}
                        />
                    )
                }
            </Masonry>
        );
    }
}
