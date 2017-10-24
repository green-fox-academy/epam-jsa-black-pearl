import React from 'react';
import {Redirect} from 'react-router';

import './index.scss';
import menuNavigation from '../../../img/nav/menunavigation.png';
import logout from '../../../img/nav/logout.png';
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
            <div className="nav-button">
              <div><img src={menuNavigation} alt="navicon" /></div>
              <p>home</p>
            </div>
            <input className="searchBar" required
              type="text" name="searchBar" />
          </div>
        </div>
        <div className="nav-item"></div>
        <div className="nav-item">
          <div className="nav-button">
            <div><img src={logout} alt="navicon" /></div>
            <p>log out</p>
          </div>
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
