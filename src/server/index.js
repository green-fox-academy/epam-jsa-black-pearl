'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const heartbeat = require('./api/heartbeat/heartbeat.js');
const auth = require('./api/login/auth.js');
const generateToken = require('./api/login/generateToken.js');
const jwtVerify  = require('./jwtVerify.js')
const register = require('./api/register/register.js');
const boards = require('./api/boards/boards.js');


const localHost = 3000;
const PORT = process.env.PORT || localHost;
const app = express();
const router = new express.Router();
const badRequest = 400;
const statusOK = 200;
const internalError = 500;
const forbidden = 403;
const conflict = 409;
const forbiddenMessage = 'User does not exists or bad credential!';

app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(bodyParser.json());

router.get('/', function(req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

router.post('/login', function(req, res) {
  if (!req.is('application/json')) {
    res.status(badRequest).json({message: 'Content type error!'});
  } else if (!req.body.username || !req.body.password) {
    res.status(badRequest).json({message: 'Missing field(s)!'});
  } else {
    auth(req.body, function(result) {
      if (result === 'error' || !result) {
        res.status(internalError).json({message: 'Something went wrong!'});
      } else if (result === 'nocredential') {
        res.status(forbidden).json({message: forbiddenMessage});
      } else if (result === 'ok') {
        res.status(statusOK).json(generateToken(req.body.username));
      }
    });
  }
});

router.post('/register', function(req, res) {
  if (!req.is('application/json')) {
    res.status(badRequest).json({message: 'Content type error!'});
  } else if (!req.body.username || !req.body.password) {
    res.status(badRequest).json({message: 'Missing field(s)!'});
  } else {
    register(req.body, function(result) {
      if (result === 'error' || !result) {
        res.status(internalError).json({message: 'Something went wrong!'});
      } else if (result === 'conflict') {
        res.status(conflict).json({message: 'The username already exists!'});
      } else if (result === 'ok') {
        res.status(statusOK).json({result: 'Register success!'});
      }
    });
  }
});

router.get('/boards', function(req, res) {
  // let username = jwtVerify(req);

  // if (username === '') {
  //   res.status(internalError).json({message: 'You are not login!'});
  // }
  boards(function(result) {
    res.send({'board': result});
  });
router.post('/boards', function(req, res) {
  let username = jwtVerify(req.headers.token);

  if (!req.is('application/json')) {
    res.status(badRequest).json({message: 'Content type error!'});
  } else if (!req.body.name) {
    res.status(badRequest).json({message: 'Missing field(s)!'});
  } else if (!username) {
    res.status(forbidden).json({message: 'Please login first!'});
  } else {
    boards.createNewBoard(req.body, username, function(result) {
      console.log(result);
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
