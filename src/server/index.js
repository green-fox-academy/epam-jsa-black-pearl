'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');

const heartbeat = require('./heartbeat.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/login', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../../dist')});
});

app.get('/register', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../../dist')});
});

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
