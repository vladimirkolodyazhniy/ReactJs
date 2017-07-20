const mongoose = require("mongoose");

const config = require('../etc/config.json');

require('../models/Note');

const Note = mongoose.model('Note');

function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

function listNotes(id) {
    return Note.find();
}

function createNote(data) {
    const note = new Note({
        title: data.title,
        text: data.text,
        color: data.color,
        createdAt: new Date()
    });

    return note.save();
}

function deleteNote(id) {
    return Note.findById(id).remove();
}

module.exports = {
    setUpConnection,
    listNotes,
    createNote,
    deleteNote
};
