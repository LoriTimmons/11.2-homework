// edge cases
// get routes to work

// building server w/express frame work
const path = require("path");
const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3002


// running express 
const app = express();

// building middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// tell express the public folder exists and available to the whole app
app.use(express.static("public"));

// Build the routes (four)
// html routes (two args route name / callback function (req , res)) request and respond
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API Routes
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});


// POST Route. Saving the new note to db.json
app.post("/api/notes", (req, res) => {
    let newNote = req.body; 
    console.log(newNote);
    newNote.id = uuidv4();
    console.log("This is new note", newNote);
    fs.readFile("./db/db.json", (err, data) => {
      if (err) {
        throw err;
      }
      let notes = JSON.parse(data)
      notes.push(newNote);
      // console.log(notes)
      fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
          throw err;
        }
      res.json(newNote);
      })
    });

});


// default route - keep near the bottom
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Keep at end
app.listen(PORT, () => {
  console.log("API server now on port 3002!");
});
