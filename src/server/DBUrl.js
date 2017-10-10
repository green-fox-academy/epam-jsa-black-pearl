'use strict';

function getDBUrl() {
  let auth = process.env.DB_USER ? process.env.DB_USER + ':' + process.env.DB_PASS + '@' : '';
  let url = 'mongodb://' + auth + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
  return url;
}

module.exports = getDBUrl;