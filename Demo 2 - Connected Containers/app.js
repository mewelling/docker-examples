const express = require('express');
const app = express();
const port = 3000;
let db; 

const { MongoClient } = require('mongodb');

async function upsertDocuments(req, res, next) {
  try {
    const collection = db.collection('documents');
    await collection.insertOne({ timestamp: new Date() });
    const docs = await collection.find({}).toArray();
    res.send(docs);
  } catch (err) { next(err); }
}

app.get('/', upsertDocuments);

/*
*   Configure MongoDb
*/
const url = 'mongodb://mongo:27017';    // Connection URL
const dbName = 'myproject'; // Database Name
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if (err) process.exit(1);
  console.log("Connected successfully to server");

  db = client.db(dbName);

  // We are connected! Start the express app.
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});