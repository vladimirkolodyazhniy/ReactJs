import axios from 'axios';

const HOST = 'http://localhost:8080';

export function saveNote(note) {
    return axios.post(`${HOST}/notes`, note);
}

export function deleteNote(id) {
    return axios.delete(`${HOST}/notes/${id}`);
}

export function getNotes() {
    return axios.get(`${HOST}/notes`);
}

export default {
    saveNote,
    deleteNote,
    getNotes
};
