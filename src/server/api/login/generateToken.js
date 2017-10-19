'use strict';

const express = require('express');
const jwt = require('jwt-simple');
const moment = require('moment');
const envConst = require('../../envConst');

const app = express();
const expireDate = 7;

app.set('jwtTokenSecret', envConst.getJwtKey());

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
