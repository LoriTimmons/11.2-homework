// edge cases
// get routes to work

const express = require('express');
const app = express();

const { notes } = require('./');
app.use(express.static('public'))

  app.get('/public/notes/html', (req, res) => {
    res.sendFile('notes.html');
  });

  app.get('/public/index/html', (req, res) => {
    res.sendFile('index.html');
  });


// Keep at end 
app.listen(3002, () => {
    console.log('API server now on port 3002!');
});