// edge cases
// get routes to work

// building server w/express frame work
const path = require("path");
const express = require('express');
const app = express();
const fs = require("fs");
const { notStrictEqual } = require("assert");

// building middleware
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
// tell express the public folder exists and available to the whole app
app.use(express.static("public"))

// Build the routes (four)
// html routes (two args route name / callback function (req , res)) request and respond 
app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, './public/notes.html'))
});

// API Routes 
app.get("/api/notes", (req, res) => {
fs.readFile("./db/db.json", (err, data) => {
if (err) {
  console.log(err);
}
res.send(data);
} );
}) 

// Hints for POST route 
// Move the body to the db.json
// hints access to the note. Read the db.json. fs.readfilr(). Read the file 
// Push into the array the new note into this db.json
// json.parse - json.stringify
// writefile 
// I can do this! 

// POST Route. Saving the new note to db.json
app.post("/api/notes", (req, res) => {
  // rec a new note and adds (push to the array) to db.json, then returns a new note 
console.log(req.body)
let newNote = req.body
note.push(newNote);
return console.log ("New note added:"+newNote.title)
});

fs.readFile("./db/db.json", (err, data) => {
  if (err) {
    console.log(err);
  }
  var notes = JSON.parse(data);
  });



// get note with ID
app.get("api/notes/:id", (req, res) => {
  res.json(notes[req.params.id]);
});


// default route - keep near the bottom 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

// const { notes } = require('./');
// app.use(express.static('public'))

//   app.get('/public/notes/html', (req, res) => {
//     res.sendFile('notes.html');
//   });

//   app.get('/public/index/html', (req, res) => {
//     res.sendFile('index.html');
//   });


// Keep at end 
app.listen(3002, () => {
    console.log('API server now on port 3002!');
});