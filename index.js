
const express = require('express');
const path = require('path');

const {MongoClient} = require('mongodb');

const connectionString = 'mongodb+srv://maryknoll_admin:Cun5ip6rxQrwEyX3@cluster0.qkh31ex.mongodb.net/?retryWrites=true&w=majority';

const app = express();
const port = process.env.PORT || 8080;
/*
async function listDatabases(client){     
    databasesList = await client.db().admin().listDatabases();     
    console.log("Databases:");     
    databasesList.databases.forEach(db => 
        console.log(` - ${db.name}`
    )); 
};
*/
app.use(express.urlencoded({ extended: true }));

async function initDatabase() {
    console.log("connecting...");
    const client = new MongoClient(connectionString);
    await client.connect();     
    console.log("connected!");
    const db = client.db('BroadBand');    
    const testResultsCollection = db.collection('TestResults');

    testResultsCollection.find().toArray().then(
        results => {
            console.log(results)    
        }
    ).catch(error => console.error(error));
    
    app.post('/results', (req, res) => {
        console.log(req.body)
        testResultsCollection.insertOne(req.body)   
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
        
    })

}
//initDatabase().catch(console.error);


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

app.get('/form.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/form.html'));
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