import React from 'react';
import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register';
import Board from '../components/boardScreen';
import BoardDetail from '../components/boardDetail';

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/boards" component={Board} />
          <Route path="/boards/:id" component={BoardDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
