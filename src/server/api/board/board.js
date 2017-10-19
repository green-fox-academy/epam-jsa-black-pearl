'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dbUrl = require('../../DBUrl.js');
const url = dbUrl();

function boardInfo(response, callback) {
  MongoClient.connect(url, function(err, database) {
    if (err) {
      return callback('error');
    }
    console.log('Connection established to ' + url);
    let collection = database.collection('board');

    collection.find().toArray(function(err, result) {
      if (err) throw err;
      database.close();
      callback(result);
    });
  });
}

module.exports = boardInfo;
