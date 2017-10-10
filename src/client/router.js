import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './login/login';
import Board from './board.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/board" component={Board} />
        </div>
      </Router>
    );
  }
}

export default App;
