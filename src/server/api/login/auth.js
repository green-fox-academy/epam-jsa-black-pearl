'use strict';

const mongodb = require('mongodb');
const validator = require('validator');
const MongoClient = mongodb.MongoClient;

const dbUrl = require('../../DBUrl.js');
const cryption = require('./bcrypt.js');
const url = dbUrl();

const minPwdLength = 6;
const maxPwdLength = 100;

function verifyPassword(password, passwordHash) {
  return cryption.verify(password, passwordHash);
}

function createUsernameQuery(credentials) {
  return {'username': credentials.username};
}

function verifyUsernamePasswordFormat(username, password) {
  return validator.isEmail(username) && password.length >= minPwdLength && password.length <= maxPwdLength;
}

function auth(credentials, callback) {
  if (!verifyUsernamePasswordFormat(credentials.username, credentials.password)) {
    callback('error');
    return;
  }
  MongoClient.connect(url, function(err, database) {
    if (err) {
      callback('error');
      return;
    }
    console.log('Connection established to ' + url);
    const collection = database.collection('users');
    let query = createUsernameQuery(credentials);

    collection.findOne(query, function(err, document) {
      if (!document) {
        callback('nocredential');
        return;
      }
      verifyPassword(credentials.password, document.password)
        .then((res) => {
          res ? callback('ok') : callback('nocredential');
          database.close();
        });
    });
  });
}

module.exports = auth;
