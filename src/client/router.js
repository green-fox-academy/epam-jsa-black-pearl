var React = require('react');
var ReactDOM = require('react-dom');
var Login = require('./login.jsx');
import Home from './home.jsx'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Basic = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/app">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      <hr />
      <Route exact path="/app" component={Home} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
)

export default Basic
