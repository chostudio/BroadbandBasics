const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serves all images from the assets folder
app.use('/assets/images', express.static(__dirname + "/assets/images"));
// Serves all files from the css folder
app.use('/css', express.static(__dirname + "/css"));
// Serves all files from the js folder
app.use('/js', express.static(__dirname + "/js"));

app.use('/answers', express.static(__dirname + "/answers"));

// Serves the index.html file
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/quiz.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/quiz.html'));
});

app.get('/lesson/how-the-internet-works.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/lesson/how-the-internet-works.html'));
});

app.get('/page-not-found.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/page-not-found.html'));
});

app.get('/Lesson1Page1.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/Lesson1Page1.html'));
});

app.get('/Lesson1Page3.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/Lesson1Page3.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);