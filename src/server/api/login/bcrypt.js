'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

function encrypt(string) {
  return bcrypt.hash(string, saltRounds);
}

function verify(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  encrypt: encrypt,
  verify: verify,
};
