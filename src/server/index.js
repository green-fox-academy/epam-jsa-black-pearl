'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const heartbeat = require('./api/heartbeat/heartbeat.js');
const auth = require('./api/login/auth.js');
const generateToken = require('./api/login/generateToken.js');

const PORT = process.env.PORT || 3000;
const app = express();
const router = new express.Router();

app.set('jwtTokenSecret', 'black_pearl');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath,
}));

app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(bodyParser.json());

router.get('/', function(req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

router.post('/login', function(req, res) {
  if (!req.is('application/json')) {
    res.status(400).json({message: 'Content type error!'});
  } else if (!req.body.username || !req.body.password) {
    res.status(400).json({message: 'Missing field(s)!'});
  } else {
    auth(req.body, function(result) {
      if (result === 'error' || !result) {
        res.status(500).json({message: 'Something went wrong!'});
      } else if (result === 'nocredential') {
        res.status(403).json({message: 'User does not exists or bad credential!'});
      } else if (result === 'ok') {
        res.status(200).json(generateToken(req.body.username));
      }
    });
  }
});

app.use('/api', router);

app.get('/login', (req, res) => {
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
