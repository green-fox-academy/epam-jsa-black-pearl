'use strict';

const mongodb = require('mongodb');
const validator = require('validator');
const MongoClient = mongodb.MongoClient;

const dbUrl = require('../../DBUrl.js');
const cryption = require('./bcrypt.js');
const url = dbUrl();

function auth(credentials, callback) {
  if (!verifyUsernamePasswordFormat(credentials.username, credentials.password)) {
    callback('error');
    return -1;
  }
  MongoClient.connect(url, function(err, database) {
    if (err) {
      callback('error');
      return -1;
    }
    console.log('Connection established to ' + url);
    const collection = database.collection('users');
    let query = createUsernameQuery(credentials);
    collection.findOne(query, function(err, document) {
      if (!document) {
        callback('nocredential');
        return -1;
      }
      verifyPassword(credentials.password, document.password)
        .then((res) => {
          res ? callback('ok') : callback('nocredential');
          database.close();
        });
    });
  });
}

function verifyUsernamePasswordFormat(username, password) {
  return validator.isEmail(username) && password.length >= 6 && password.length <= 100;
}

function createUsernameQuery(credentials) {
  return {'username': credentials.username};
}

function verifyPassword(password, passwordHash) {
  return cryption.verify(password, passwordHash);
}

module.exports = auth;
