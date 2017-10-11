'use strict';
const cryptoJS = require('crypto-js');
const MD5 = require("crypto-js/md5");

function crypto(string) {
  return MD5(string).toString();
}

module.exports = crypto