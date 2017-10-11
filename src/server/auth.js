'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dbUrl = require('./DBUrl.js');
const url = dbUrl();

function auth(requestBody, callback) {
  MongoClient.connect(url, function (err, database) {
    if (err) {
      callback('error');
      return;
    }
    console.log('Connection established to ' + url);
    const collection = database.collection('users');
    collection.find(requestBody).toArray(function (err, result) {
      if (err) {
        callback('error');
        return;
      }
      if (result.length === 0) {
        callback('nocredential');
      } else {
        callback('ok');
      }
      database.close();
    });
  });
}

module.exports = auth;