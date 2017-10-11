'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dbUrl = require('../../DBUrl.js');
const cryption = require('./bcrypt.js');
const url = dbUrl();

function auth(credentials, callback) {
  MongoClient.connect(url, function (err, database) {
    if (err) {
      callback('error');
      return;
    }
    console.log('Connection established to ' + url);
    const collection = database.collection('users');
    let query = formQuery(credentials);
    collection.findOne(query, function(err, document) {
      reportQuery(credentials, document)
      .then((res) => {
        if(res) {
          callback('ok');
        } else {
          callback('nocredential');
        }
        database.close();
      });
    });
  });
}

function formQuery(credentials) {
  let obj = {
    'username': credentials.username
  }
  return obj;
}

function reportQuery(credentials, document) {
  return cryption.verify(credentials.password, document.password)
}

module.exports = auth;
