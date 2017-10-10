'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const heartbeat = require('./heartbeat.js');
const auth = require('./auth.js');

const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();

app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(bodyParser.json());

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/login', function(req, res) {
  if(!req.is('application/json')) {
    res.status(400).json({ message: 'Content type error!'});
  } else if(!req.body.username || !req.body.password) {
    res.status(400).json({ message: 'Missing field(s)!'});
  }
});

app.use('/api', router);

app.get('/heartbeat', (req, res) => {
  heartbeat(function(result) {
    if (result === 'error') {
      res.json({'status': 'ok', 'database': 'error'});
    } else {
      res.json({'status': 'ok', 'database': 'ok'});
    }
  });
});

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
