'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const envConst = require('../../envConst.js');
const url = envConst.getDBUrl();

const ZERO = 0;

function createInsertQuery(request, username) {
  return {
    'username': username,
    'boardname': request.boardname,
    'timestamp': (new Date()).getTime(),
  };
}

function createFindQuery(username) {
  return {'username': username};
}

function createNewColumnQuery(request) {
  return {
    '_id': new mongodb.ObjectId(),
    'columnName': request.columnName,
    'cards': [],
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

function columnQuery(username, boardId, columnsId) {
  try {
    let findBoardId = new mongodb.ObjectId(boardId);
    let findcolumnsId = new mongodb.ObjectId(columnsId);

    return {
      'username': username,
      '_id': findBoardId,
      'columns._id': findcolumnsId,
    };
  } catch (error) {
    return null;
  }
}

function cardQuery(username, boardId, columnsId, cardsId) {
  try {
    let findBoardId = new mongodb.ObjectId(boardId);
    let findcolumnsId = new mongodb.ObjectId(columnsId);
    let findCardsId = new mongodb.ObjectId(cardsId);

    return {
      'username': username,
      '_id': findBoardId,
      'columns._id': findcolumnsId,
      'columns.cards._id': findCardsId,
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

function addCardToColumn(board, columnId, cardName) {
  board.columns = board.columns.map(function(element) {
    if (element._id.toString() === columnId.toString()) {
      element.cards = element.cards ? element.cards : [];
      element.cards.push({
        '_id': new mongodb.ObjectId(),
        'cardName': cardName,
      });
    }
    return element;
  });
}

function compareId(id1, id2) {
  return id1.toString() === id2.toString();
}

function moveColumn(board, columnId, newIndex) {
  let columnToMove = {};

  board.columns = board.columns.filter(function(column, index) {
    if (compareId(column._id, columnId)) {
      columnToMove = column;
      return false;
    }
    return true;
  });
  if (!columnToMove._id) {
    return;
  }
  board.columns.splice(newIndex, ZERO, columnToMove);
}

function validateColumnId(board, fromColumnId, toColumnId) {
  const oldFound = board.columns.some(function(column) {
    return compareId(column._id, fromColumnId);
  });
  const newFound = board.columns.some(function(column) {
    return compareId(column._id, toColumnId);
  });

  return oldFound && newFound;
}

function moveCard(board, requestBody, columnId, cardId) {
  let cardToMove = {};

  board.columns = board.columns.map(function(column) {
    if (compareId(column._id, columnId)) {
      column.cards = column.cards.filter(function(card) {
        if (compareId(card._id, cardId)) {
          cardToMove = card;
          return false;
        }
        return true;
      });
    }
    return column;
  });
  if (!cardToMove._id) {
    return;
  }
  board.columns = board.columns.map(function(column) {
    if (compareId(column._id, requestBody.newColumnId)) {
      column.cards.splice(requestBody.newIndex, ZERO, cardToMove);
    }
    return column;
  });
}

function filterCards(board, columnsId, cardsId) {
  board.columns = board.columns.map(function(e) {
    if (e._id.toString() === columnsId.toString()) {
      e.cards = e.cards.filter(function(element) {
        return element._id.toString() !== cardsId.toString();
      });
    }
    return e;
  });
}

function renameColumn(board, columnsId, name) {
  board.columns = board.columns.map(function(e) {
    if (e._id.toString() === columnsId.toString()) {
      e.columnName = name;
    }
    return e;
  });
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
    if (board === 'notFound' || !board) {
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

function deleteColumnId(username, boardId, columnsId, callback) {
  MongoClient.connect(url, function(err, database) {
    if (err) {
      return callback('error');
    }
    console.log('Connection established to ' + url);
    let query = columnQuery(username, boardId, columnsId);

    if (!query) {
      return callback('notFound');
    }
    database.collection('boards').findOne(query, function(err, result) {
      if (result === null) {
        return callback('notFound');
      }
      let newColumns = result.columns.filter(function(e) {
        if (e._id.toString() !== new mongodb.ObjectId(columnsId).toString()) {
          return true;
        }
        return false;
      });

      database.collection('boards')
        .update(query, {$set: {'columns': newColumns}}, function(err, obj) {
          database.close();
          if (err) {
            return callback('error');
          }
          if (obj.result.nModified) {
            return callback(obj);
          }
          callback('notFound');
        });
      if (err) {
        return callback('error');
      }
    });
  });
}

function createNewCard(request, username, boardId, columnId, callback) {
  getBoardById(username, boardId, function(board) {
    if (board === 'notFound' || !board) {
      return callback('notFound');
    } else if (board === 'error') {
      return callback('error');
    }

    addCardToColumn(board, columnId, request.cardName);

    MongoClient.connect(url, function(err, database) {
      if (err) {
        return callback('error');
      }
      database.collection('boards').update({_id: new mongodb.ObjectId(boardId)},
        {$set: board}, function(err, result) {
          database.close();
          if (err) {
            return callback('error');
          }
          if (result.result.nModified) {
            return callback('updated');
          }
          return callback('notFound');
        });
    });
  });
}

function deleteCardById(username, boardId, columnsId, cardsId, callback) {
  MongoClient.connect(url, function(err, database) {
    if (err) {
      return callback('error');
    }
    console.log('Connection established to ' + url);
    let query = cardQuery(username, boardId, columnsId, cardsId);

    if (!query) {
      return callback('notFound');
    }
    database.collection('boards').findOne(query, function(err, result) {
      if (result === null) {
        return callback('notFound');
      }
      filterCards(result, columnsId, cardsId);
      database.collection('boards')
        .update(query, {$set: {'columns': result.columns}});
      database.close();
      if (err) {
        return callback('error');
      }
      callback(result);
    });
  });
}

function moveCardToNewColumn(requestBody, boardId, columnId, cardId, callback) {
  getBoardById(requestBody.username, boardId, function(board) {
    if (board === 'notFound' || !board) {
      return callback('notFound');
    } else if (board === 'error') {
      return callback('error');
    }
    if (!validateColumnId(board, columnId, requestBody.newColumnId)) {
      return callback('notFound');
    }
    moveCard(board, requestBody, columnId, cardId);
    MongoClient.connect(url, function(err, database) {
      if (err) {
        return callback('error');
      }
      database.collection('boards').update({_id: new mongodb.ObjectId(boardId)},
        {$set: board}, function(err, result) {
          database.close();
          if (err) {
            return callback('error');
          }
          if (result.result.nModified) {
            return callback('updated');
          }
          return callback('notFound');
        });
    });
  });
}

function modifyColumnName(requestBody, username, boardId, columnsId, callback) {
  MongoClient.connect(url, function(err, database) {
    if (err) {
      return callback('error');
    }
    console.log('Connection established to ' + url);
    let query = columnQuery(username, boardId, columnsId);

    if (!query) {
      return callback('notFound');
    }
    database.collection('boards').findOne(query, function(err, result) {
      if (result === null) {
        return callback('notFound');
      }
      if (!query) {
        return callback('notFound');
      }
      renameColumn(result, columnsId, requestBody.columnName);
      database.collection('boards').update(query,
        {$set: {'columns': result.columns}}, function(err, obj) {
          database.close();
          if (err) {
            return callback('error');
          }
          if (obj.result.nModified) {
            return callback(obj);
          }
          return callback('notFound');
        });
      if (err) {
        return callback('error');
      }
    });
  });
}

function moveColumnToNewPosition(requestBody, username,
  boardId, columnId, callback) {
  getBoardById(username, boardId, function(board) {
    if (board === 'notFound' || !board) {
      return callback('notFound');
    } else if (board === 'error') {
      return callback('error');
    }
    moveColumn(board, columnId, requestBody.newIndex);
    MongoClient.connect(url, function(err, database) {
      if (err) {
        return callback('error');
      }
      database.collection('boards').update({_id: new mongodb.ObjectId(boardId)},
        {$set: board}, function(err, result) {
          database.close();
          if (err) {
            return callback('error');
          }
          if (result.result.nModified) {
            return callback('updated');
          }
          return callback('notFound');
        });
    });
  });
}

module.exports = {
  'createNewBoard': createNewBoard,
  'getBoardsByUser': getBoardsByUser,
  'getBoardById': getBoardById,
  'deleteboardId': deleteboardId,
  'deleteColumnId': deleteColumnId,
  'createNewColumn': createNewColumn,
  'createNewCard': createNewCard,
  'deleteCardById': deleteCardById,
  'moveCardToNewColumn': moveCardToNewColumn,
  'modifyColumnName': modifyColumnName,
  'moveColumnToNewPosition': moveColumnToNewPosition,
};
