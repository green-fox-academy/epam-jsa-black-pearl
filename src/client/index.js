import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import Login from './login/login';


ReactDOM.render(
  <Login />, document.querySelector('#root')
=======
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, browserHistory } from 'react-router-dom'

import Login from './login.jsx'
import Board from './board.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/board">Board</Link></li>
        </ul>
        <hr />
        {this.props.children}
      </div>
    );
  }
}

ReactDom.render(
  (<Router history={browserHistory}>
    <App>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/board" component={Board} />
      </Switch>
    </App>
  </Router>),
  document.getElementById('root')
>>>>>>> react-router
);
