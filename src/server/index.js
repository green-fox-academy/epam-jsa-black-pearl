'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');

const heartbeat = require('./heartbeat.js');

const PORT = process.env.PORT || 3000;
const app = express();
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath,
}));

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
