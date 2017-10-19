'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const envConst = require('../../envConst');
const url = envConst.getDBUrl();

function boardInfo(callback) {
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
