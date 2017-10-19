'use strict';

const jwt = require('jwt-simple');
const envConst = require('./envConst');

const jwtTokenSecret = envConst.getJwtKey();

function verifyJwt(token) {
  try {
    let decoded = jwt.decode(token, jwtTokenSecret);

    return decoded.exp > Date.now() ? decoded.iss : '';
  } catch (error) {
    return '';
  }
}

module.exports = verifyJwt;
