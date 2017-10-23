'use strict';

const mongodb = require('mongodb');
const validator = require('validator');
const MongoClient = mongodb.MongoClient;

const envConst = require('../../envConst.js');
const cryption = require('../login/bcrypt');
const url = envConst.getDBUrl();

const minPwdLength = 6;
const maxPwdLength = 100;

function verifyUsernamePasswordFormat(username, password) {
  return validator.isEmail(username)
    && password.length >= minPwdLength
    && password.length <= maxPwdLength;
}

function encryptPassword(password) {
  return cryption.encrypt(password);
}

function createInsertQuery(request, res) {
  return {
    'username': request.username,
    'password': res,
  };
}

function register(request, callback) {
  if (!verifyUsernamePasswordFormat(request.username,
    request.password)) {
    return callback('error');
  }
  MongoClient.connect(url, function(err, database) {
    if (err) {
      return callback('error');
    }
    console.log('Connection established to ' + url);
    encryptPassword(request.password).then(function(res) {
      let query = createInsertQuery(request, res);

      database.collection('users').insert(query, function(err, result) {
        database.close();
        if (err) {
          return callback('conflict');
        }
        return callback('ok');
      });
    });
  });
}

module.exports = register;
