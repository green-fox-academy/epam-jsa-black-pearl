'use strict';

function getDBUrl() {
  const DB_HOST = process.env.DB_HOST || 'localhost';
  const DB_PORT = process.env.DB_PORT || '27017';
  const DB_NAME = process.env.DB_NAME || 'black-pearl';
  const DB_USER = process.env.DB_USER;
  const DB_PASS = process.env.DB_PASS;
  let url = 'mongodb://';
  if (DB_USER && DB_PASS) {
    url = url + DB_USER + ':' + DB_PASS + '@';
  }
  url = url + DB_HOST + ':' + DB_PORT + '/' + DB_NAME;
  return url;
}

module.exports = getDBUrl;