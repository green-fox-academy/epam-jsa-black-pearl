'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const envConst = require('../../envConst.js');
const url = envConst.getDBUrl();

function createInsertQuery(request, username) {
  return {
    'username': username,
    'boardname': request.boardname,
    'timestamp': request.timestamp,
  };
}

function createFindQuery(username) {
  return {'username': username};
}

function idQuery(username, id) {
  try {
    let mongoId = new mongodb.ObjectId(id);

    return {
      'username': username,
      '_id': mongoId,
    };
  } catch (error) {
    return {
      'username': username,
      '_id': '',
    };
  }
}

function boardIdFilter() {
  return {
    '_id': 1,
    'boardname': 1,
    'columns': 1,
  };
}

function createFieldsFilter() {
  return {
    'username': 1,
    'boardname': 1,
    'timestamp': 1,
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

function getBoardsByUser(username, callback) {
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

function getBoardById(username, boardId, callback) {
  MongoClient.connect(url, function(err, database) {
    if (err) {
      return callback('error');
    }
    console.log('Connection established to ' + url);
    let query = idQuery(username, boardId);
    let field = boardIdFilter();

    database.collection('boards').findOne(query, field, function(err, result) {
      database.close();
      if (err) {
        return callback('error');
      }
      callback(result);
    });
  });
}

function deleteBoardById(username, boardId, callback) {
  MongoClient.connect(url, function(err, database) {
    if (err) {
      return callback('error');
    }
    console.log('Connection established to ' + url);
    let query = idQuery(username, boardId);

    database.collection('boards').remove(query, function(err, result) {
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
  'getBoardsByUser': getBoardsByUser,
  'getBoardById': getBoardById,
  'deleteBoardById': deleteBoardById,
};
