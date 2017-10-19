'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const envConst = require('../../envConst');

const expireDate = 7;
const jwtTokenSecret = envConst.getJwtKey();

function generateToken(username) {
  let expires = moment().add(expireDate, 'days').valueOf();
  let token = jwt.encode({
    iss: username,
    exp: expires,
  }, jwtTokenSecret);

  return {
    token: token,
    expires: expires,
  };
}

module.exports = generateToken;
