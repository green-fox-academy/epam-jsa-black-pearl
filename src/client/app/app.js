import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register';
import Board from '../components/boardNav';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/board" component={Board} />
        </div>
      </Router>
    );
  }
}

export default App;
