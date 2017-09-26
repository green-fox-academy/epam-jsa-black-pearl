'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/test';

app.use(bodyParser.json());

app.get('/heartbeat', function (req, res) {
  let query = {};
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the MongoDB server. Error:', err);
      res.send({"status": "ok", "database": "error"});
      throw err;
    }
    console.log('Connection established to ' + url);
    var collection = db.collection('heartbeat');
    collection.find(query).toArray(function (err, result) {
      if (err) {
        throw err;
      } else {
        db.close();
        if (result.length === 0) {
          res.send({"status": "ok", "database": "error"});
        } else {
          res.send({"status": "ok", "database": "ok"});
        }
      }
    });
  });
});

app.listen(process.env.port || 3000, function () {
  console.log('now listening for requests');
});