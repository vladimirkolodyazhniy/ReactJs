import api from '../api';

export const GET_NOTES = 'GET_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const REQUEST_NOTES = 'REQUEST_NOTES';

export const addNote = note => dispatch => {
    dispatch({ type: REQUEST_NOTES });

    return api.saveNote(note)
        .then(data => dispatch({
            type: 'ADD_NOTE',
            note: data.data
        }));
}

export const removeNote = id => dispatch => {
    dispatch({ type: REQUEST_NOTES });

    return api.deleteNote(id)
        .then(data => dispatch({
            type: 'DELETE_NOTE',
            id
        }));
}

export const fetchNotes = () => dispatch => {
    dispatch({ type: REQUEST_NOTES });

    return api.getNotes()
        .then(data => dispatch({
            type: 'GET_NOTES',
            notes: data.data
        }));
}
