import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, browserHistory } from 'react-router-dom'
import App from './router.js'

ReactDom.render(<App /> ,document.getElementById('root')
);