const express = require('express');
const app = express();

const { notes } = require('./');

app.get('/notes/html', (req, res) => {
    res.sendFile('notes.html');
  });


// Keep at end 
app.listen(3002, () => {
    console.log('API server now on port 3002!');
});