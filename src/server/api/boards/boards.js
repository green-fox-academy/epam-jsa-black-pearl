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

function createNewColumnQuery(request) {
  return {
    '_id': new mongodb.ObjectId(),
    'columnName': request.columnName,
  };
}

function idQuery(username, id) {
  try {
    let mongoId = new mongodb.ObjectId(id);

    return {
      'username': username,
      '_id': mongoId,
    };
  } catch (error) {
    return null;
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

    if (!query) {
      return callback('notFound');
    }
    database.collection('boards').findOne(query, field, function(err, result) {
      database.close();
      if (err) {
        return callback('error');
      }
      callback(result);
    });
  });
}

function deleteboardId(username, boardId, callback) {
  MongoClient.connect(url, function(err, database) {
    if (err) {
      return callback('error');
    }
    console.log('Connection established to ' + url);
    let query = idQuery(username, boardId);

    if (!query) {
      return callback('notFound');
    }
    database.collection('boards').remove(query, function(err, result) {
      database.close();
      if (err) {
        return callback('error');
      }
      callback(result);
    });
  });
}

function createNewColumn(request, username, boardId, callback) {
  getBoardById(username, boardId, function(board) {
    if (board === 'error' || !board) {
      return callback('notFound');
    } else if (board === 'error') {
      return callback('error');
    }
    let newBoard = createNewColumnQuery(request);

    MongoClient.connect(url, function(err, database) {
      if (err) {
        return callback('error');
      }
      database.collection('boards').update(board,
        {$push: {'columns': newBoard}}, function(err, result) {
          database.close();
          if (err || !result.result.nModified) {
            return callback('error');
          }
          return callback('updated');
        });
    });
  });
}

module.exports = {
  'createNewBoard': createNewBoard,
  'getBoardsByUser': getBoardsByUser,
  'getBoardById': getBoardById,
  'deleteboardId': deleteboardId,
  'createNewColumn': createNewColumn,
};
