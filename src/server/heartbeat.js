'use strict';

const mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var db = require('../../.environment.json');
var url = 'mongodb://' + db.database.url + ':' + db.database.port + '/' + db.database.database;

function heartbeat(callback) {
    MongoClient.connect(url, function (err, database) {
        if (err) {
            callback('error');
            return;
        }
        console.log('Connection established to ' + url);
        let collection = database.collection(db.database.collection);
        collection.find({}).toArray(function (err, result) {
            if (err) {
                callback('error');
                return;
            }
            if (result.length === 0) {
                callback('error');
            } else {
                callback('ok');
            }
            database.close();
        });
    });
}

module.exports = heartbeat;