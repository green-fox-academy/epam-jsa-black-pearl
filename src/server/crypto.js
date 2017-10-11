'use strict';
const md5 = require('crypto-js/md5');

function crypto(string) {
  return md5(string).toString();
}

module.exports = crypto;
