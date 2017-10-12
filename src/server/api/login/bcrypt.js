'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

function encrypt(string) {
  let stringHash;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(string, salt, function(err, hash) {
      stringHash = hash;
    });
    return stringHash;
  });
}

function verify(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  encrypt: encrypt,
  verify: verify,
};
