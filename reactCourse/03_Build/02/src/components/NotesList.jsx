import React, { Component } from 'react';

import Note from './Note.jsx';

export default class NotesList extends Component {
    render() {
        const {
            notes,
            onNoteDelete
        } = this.props;

        return (
            <div>
                {
                    notes.map(note =>
                        <Note
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            date={note.date}
                            moneyAmount={note.moneyAmount}
                            iconStyles={note.styles}
                            category={note.category}
                            subCategory={note.subCategory}
                            onDelete={onNoteDelete}
                        />
                    )
                }
            </div>
        );
    }
}
