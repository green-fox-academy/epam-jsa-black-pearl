'use strict';

const mongodb = require('mongodb');
const validator = require('validator');
const MongoClient = mongodb.MongoClient;

const envConst = require('../../envConst.js');
const cryption = require('./bcrypt.js');
const url = envConst.getDBUrl();

const minPwdLength = 6;
const maxPwdLength = 100;

function verifyPassword(password, passwordHash) {
  return cryption.verify(password, passwordHash);
}

function createUsernameQuery(credentials) {
  return {'username': credentials.username};
}

function verifyUsernamePasswordFormat(username, password) {
  return validator.isEmail(username)
    && password.length >= minPwdLength
    && password.length <= maxPwdLength;
}

function auth(credentials, callback) {
  if (!verifyUsernamePasswordFormat(credentials.username,
    credentials.password)) {
    callback('error');
    return;
  }
  MongoClient.connect(url, function(err, database) {
    if (err) {
      return callback('error');
    }
    console.log('Connection established to ' + url);
    let query = createUsernameQuery(credentials);

    database.collection('users').findOne(query, function(err, document) {
      if (err || !document) {
        return callback('nocredential');
      }
      verifyPassword(credentials.password, document.password)
        .then((res) => {
          database.close();
          return res ? callback('ok') : callback('nocredential');
        });
    });
  });
}

module.exports = auth;
