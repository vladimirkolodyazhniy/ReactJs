const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./etc/config.json');

const db = require('./utils/DataBaseUtils');

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

const server = app.listen(config.serverPort, function() {
    console.log(`Server is up and running on port ${config.serverPort}`);
});
