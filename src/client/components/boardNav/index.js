import React from 'react';
import {Link} from 'react-router-dom';
import './index.scss';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <nav>
          <button></button>
          <p>BOARD</p>
          <input id="searchBar" required type="text" name="searchBar" />
          <p>Black Pearl</p>
          <Link to={'./login'}>Logout</Link>
        </nav>
      </div>
    )
  }
}

export default Board;