'use strict';
const cryptoJS = require('crypto-js');

function crypto(String) {
  let encrypted = cryptoJS.AES.encrypt(String, 'black-pearl');
  return encrypted.toString();
}

module.exports = crypto