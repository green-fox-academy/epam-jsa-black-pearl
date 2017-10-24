import React from 'react';

import './index.scss';
import menuNavigation from '../../../img/nav/menunavigation.png';
import logout from '../../../img/nav/logout.png';
import isLoggedIn from '../../controller/isLoggedIn';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: isLoggedIn()};
  }

  logout() {
    localStorage.token = '';
    this.setState({isLoggedIn: false});
  }

  redirectHome() {
    window.location.href = '/boards';
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
            <div className="nav-button"
              onClick={this.redirectHome.bind(this)}>
              <div><img src={menuNavigation} alt="navicon" /></div>
              <p>home</p>
            </div>
            <input className="searchBar" required
              type="text" name="searchBar" />
          </div>
        </div>
        <div className="nav-item"></div>
        <div className="nav-item">
          <div className="nav-button"
            onClick={this.logout.bind(this)}>
            <div><img src={logout} alt="navicon" /></div>
            <p>log out</p>
          </div>
        </div>
      </nav>
    );
  }
}

export default Board;
