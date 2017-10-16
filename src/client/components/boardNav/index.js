import React from 'react';
import {Link} from 'react-router-dom';
import './index.scss';
import menuNavigation from '../../../img/nav/menunavigation.png';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="board-nav">
        <div className="nav-item">
          <img src={menuNavigation} alt="navicon" />
          <p>board</p>
          <input className="searchBar" required type="text" name="searchBar" />
        </div>
        <div className="nav-item">
          <p>Black Pearl</p>
        </div>
        <div className="nav-item">
          <Link to={'/login'}>Logout</Link>
        </div>
      </nav>
    );
  }
}

export default Board;
