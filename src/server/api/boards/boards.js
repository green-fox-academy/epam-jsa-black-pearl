'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const envConst = require('../../envConst.js');
const url = envConst.getDBUrl();

function createInsertQuery(request, username) {
  return {
    'username': username,
    'boardname': request.boardname,
  };
}

function createFindQuery(username) {
  return {'username': username};
}

function createFieldsFilter() {
  return {
    'username': 1,
    'boardname': 1,
  };
}

function createNewBoard(request, username, callback) {
  MongoClient.connect(url, function(err, database) {
    if (err) {
      return callback('error');
    }
    console.log('Connection established to ' + url);
    let query = createInsertQuery(request, username);

    database.collection('boards').insert(query, function(err, result) {
      database.close();
      if (err) {
        return callback('error');
      }
      return callback('ok');
    });
  });
}

function boardInfo(username, callback) {
  MongoClient.connect(url, function(err, database) {
    if (err) {
      return callback('error');
    }
    console.log('Connection established to ' + url);
    let collection = database.collection('boards');
    let query = createFindQuery(username);
    let field = createFieldsFilter();

    collection.find(query, field).toArray(function(err, result) {
      database.close();
      if (err) {
        return callback('error');
      }
      callback(result);
    });
  });
}

module.exports = {
  'createNewBoard': createNewBoard,
  'boardInfo': boardInfo,
};
