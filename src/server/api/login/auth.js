'use strict';

const mongodb = require('mongodb');
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
    let query = formQuery(credentials);
    collection.findOne(query, function(err, document) {
      if (!document) {
        callback('nocredential');
        return -1;
      }
      verifyPasswordHash(credentials, document)
        .then((res) => {
          res ? callback('ok') : callback('nocredential');
          database.close();
        });
    });
  });
}

function verifyUsernamePasswordFormat(username, password) {
  let regex = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$");
  if (regex.test(username) && password.length >= 6 && password.length <= 15) {
    return true;
  } else {
    return false;
  }
}

function formQuery(credentials) {
    return {'username': credentials.username};
}

function verifyPasswordHash(credentials, document) {
  return cryption.verify(credentials.password, document.password);
}

module.exports = auth;
