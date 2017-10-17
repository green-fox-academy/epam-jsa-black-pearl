'use strict';

const mongodb = require('mongodb');
const validator = require('validator');
const MongoClient = mongodb.MongoClient;

const dbUrl = require('../../DBUrl.js');
const cryption = require('../login/bcrypt');
const url = dbUrl();

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

function createInsertQuert(request) {
  return {
    'username': request.username,
    'password': encryptPassword(request.password),
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
    let query = createInsertQuert(request);

    database.collection('users').insert(query, function(err, result) {
      if (err) {
        console.log('error: ' + err);
        return callback('nocredential');
      }
    });
  });
}

module.exports = register;
