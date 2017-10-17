import React from 'react';
import {Redirect} from 'react-router';
import './index.scss';
import menuNavigation from '../../../img/nav/menunavigation.png';
import isLoggedIn from '../../controller/isLoggedIn';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: isLoggedIn()};
  }
  render() {
    if (!this.state.isLoggedIn) {
      return (
        <Redirect to="/login" />
      );
    }
    return (
      <nav className="board-nav">
        <div className="nav-item">
          <div className="nav-left">
            <img src={menuNavigation} alt="navicon" />
            <p>board</p>
            <input className="searchBar" required
              type="text" name="searchBar" />
          </div>
        </div>
        <div className="nav-item">
          <p>Black Pearl</p>
        </div>
        <div className="nav-item">
          <button onClick={this.logout.bind(this)}>Logout</button>
        </div>
      </nav>
    );
  }
  logout() {
    localStorage.token = '';
    this.setState({isLoggedIn: false});
  }
}

export default Board;
