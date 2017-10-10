'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const DBUrl = require('./DBUrl.js');

const url = DBUrl();

function heartbeat(callback) {
  MongoClient.connect(url, function(err, database) {
    if (err) {
      callback('error');
      return;
    }
    console.log('Connection established to ' + url);
    const collection = database.collection('heartbeat');
    collection.find({}).toArray(function(err, result) {
      if (err) {
        callback('error');
        return;
      }
      if (result.length === 0) {
        callback('error');
      } else {
        callback('ok');
      }
      database.close();
    });
  });
}

module.exports = heartbeat;
