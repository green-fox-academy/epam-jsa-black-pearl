import React from 'react';

import './index.scss';
import BoardNav from '../boardNav';
import BoardColumn from '../boardColumn';

class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="board">
        <BoardNav />
        <div className="board-header">
          <p><span className="board-name">jsa-design</span></p>
        </div>
        <div className="board-main">
          <BoardColumn />
          <BoardColumn />
        </div>
      </div>
    );
  }
}

export default BoardScreen;
