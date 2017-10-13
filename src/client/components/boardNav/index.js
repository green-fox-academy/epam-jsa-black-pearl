import React from 'react';
import {Link} from 'react-router-dom';

class Board extends React.Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <nav>
        <button name="Navi"></button>
        <input id="searchBar" required type="text" name="searchBar" />
        <p>Black Pearl</p>
        <Link to={'./login'}>Logout</Link>
      </nav>
    )
  }
}

export default Board;