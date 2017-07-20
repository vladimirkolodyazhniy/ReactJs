import React, { Component }   from 'react';
import { connect } from 'react-redux';

import { addNote, removeNote, fetchNotes } from '../actions';

import NoteEditor from '../components/NoteEditor.jsx';
import NotesList from '../components/NotesList.jsx';

class AppContainer extends Component {
    componentWillMount() {
        this.props.fetchNotes();
    }

    render() {
        const {
            addNotes,
            notes,
            removeNote,
            isFetching
        } = this.props;

        return (
            <div>
                <NoteEditor onNoteAdd={addNote} />

                {
                    isFetching
                    ? 'Loading...'
                    : <NotesList notes={notes} onNoteDelete={removeNote} />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notes: state.items,
        isFetching: state.isFetching
    };
}

export default connect( mapStateToProps, { addNote, removeNote, fetchNotes })(AppContainer);
