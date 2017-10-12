import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from '../components/Login';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
