'use strict';

const express = require('express');
const jwt = require('jwt-simple');
const moment = require('moment');

const app = express();
const expireDate = 7;

app.set('jwtTokenSecret', 'black_pearl');

function generateToken(username) {
  let expires = moment().add(expireDate, 'days').valueOf();
  let token = jwt.encode({
    iss: username,
    exp: expires,
  },
  app.get('jwtTokenSecret'));

  return {
    token: token,
    expires: expires,
  };
}

module.exports = generateToken;
