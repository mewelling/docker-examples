const express = require('express');
const app = express();
const port = 3000;

const { MongoClient } = require('mongodb');

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/hits',(req, res) => {
  insertDocuments((err, result) => {
    findDocuments((err, results) => {
      res.send(results);
    })
  })
});

/*
*   Configure MongoDb
*/
const url = 'mongodb://mongo:27017';    // Connection URL
const dbName = 'myproject'; // Database Name
let db; 
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if (err) process.exit(1);
  console.log("Connected successfully to server");

  db = client.db(dbName);

  // We are connected! Start the express app.
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

function insertDocuments(callback) {
  const collection = db.collection('documents');
  collection.insert({ timestamp: new Date() }, callback);
}

function findDocuments(callback) {
  const collection = db.collection('documents');
  collection.find({}).toArray(callback);
}