'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const heartbeat = require('./api/heartbeat/heartbeat.js');
const auth = require('./api/login/auth.js');
const generateToken = require('./api/login/generateToken.js');
const jwtVerify = require('./jwtVerify.js');
const register = require('./api/register/register.js');
const boards = require('./api/boards/boards.js');

const localHost = 3000;
const PORT = process.env.PORT || localHost;
const app = express();
const router = new express.Router();
const BAD_REQUEST = 400;
const STATUS_OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const STATUS_FORBIDDEN = 403;
const CONFLICT = 409;
const forbiddenMessage = 'User does not exists or bad credential!';
const SERVER_ERROR_MESSAGE = 'Something went wrong!';

app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(bodyParser.json());

router.get('/', function(req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

router.post('/login', function(req, res) {
  if (!req.is('application/json')) {
    res.status(BAD_REQUEST).json({message: 'Content type error!'});
  } else if (!req.body.username || !req.body.password) {
    res.status(BAD_REQUEST).json({message: 'Missing field(s)!'});
  } else {
    auth(req.body, function(result) {
      if (result === 'error' || !result) {
        res.status(INTERNAL_SERVER_ERROR).json({message: SERVER_ERROR_MESSAGE});
      } else if (result === 'nocredential') {
        res.status(STATUS_FORBIDDEN).json({message: forbiddenMessage});
      } else if (result === 'ok') {
        res.status(STATUS_OK).json(generateToken(req.body.username));
      }
    });
  }
});

router.post('/register', function(req, res) {
  if (!req.is('application/json')) {
    res.status(BAD_REQUEST).json({message: 'Content type error!'});
  } else if (!req.body.username || !req.body.password) {
    res.status(BAD_REQUEST).json({message: 'Missing field(s)!'});
  } else {
    register(req.body, function(result) {
      if (result === 'error' || !result) {
        res.status(INTERNAL_SERVER_ERROR).json({message: SERVER_ERROR_MESSAGE});
      } else if (result === 'conflict') {
        res.status(CONFLICT).json({message: 'The username already exists!'});
      } else if (result === 'ok') {
        res.status(STATUS_OK).json({result: 'Register success!'});
      }
    });
  }
});

router.get('/boards', function(req, res) {
  let username = jwtVerify(req.headers.token);

  if (!username) {
    res.status(STATUS_FORBIDDEN).json({message: 'Please login first!'});
  } else {
    boards.getBoardsByUser(username, function(result) {
      if (result === 'error' || !result) {
        res.status(INTERNAL_SERVER_ERROR).json({message: SERVER_ERROR_MESSAGE});
      }
      res.json({'boards': result});
    });
  }
});

router.get('/boards/:id', function(req, res) {
  let username = jwtVerify(req.headers.token);
  let boardId = req.params.id;

  if (!username) {
    res.status(STATUS_FORBIDDEN).json({message: 'Please login first!'});
  } else {
    boards.getBoardById(username, boardId, function(result) {
      if (result === 'error' || !result) {
        res.status(INTERNAL_SERVER_ERROR).json({message: SERVER_ERROR_MESSAGE});
      }
      res.json(result);
    });
  }
});

router.post('/boards', function(req, res) {
  let username = jwtVerify(req.headers.token);

  if (!req.is('application/json')) {
    res.status(BAD_REQUEST).json({message: 'Content type error!'});
  } else if (!req.body.boardname) {
    res.status(BAD_REQUEST).json({message: 'Missing field(s)!'});
  } else if (!username) {
    res.status(STATUS_FORBIDDEN).json({message: 'Please login first!'});
  } else {
    boards.createNewBoard(req.body, username, function(result) {
      if (result === 'error' || !result) {
        res.status(INTERNAL_SERVER_ERROR).json({message: SERVER_ERROR_MESSAGE});
      }
      res.status(STATUS_OK).json({result: 'Add new board success!'});
    });
  }
});

app.use('/api', router);

app.get(['/login', '/register', '/boards'], (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../../dist')});
});

app.get('/heartbeat', (req, res) => {
  heartbeat(function(result) {
    if (result === 'error') {
      res.json({'status': 'ok', 'database': 'error'});
    } else {
      res.json({'status': 'ok', 'database': 'ok'});
    }
    return;
  });
});

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
