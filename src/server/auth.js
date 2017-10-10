'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const db = require('../../.environment.json');
const url = 'mongodb://' + db.database.url + ':' + db.database.port + '/' + db.database.database;