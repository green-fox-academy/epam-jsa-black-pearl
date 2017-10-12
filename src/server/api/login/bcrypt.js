'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

function encrypt(string) {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(string, salt, function(err, hash) {
      return hash;
    });
  });
}

function verify(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  encrypt: encrypt,
  verify: verify,
};
