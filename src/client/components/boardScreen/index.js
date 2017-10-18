import React from 'react';
import './index.scss';
import BoardNav from '../boardNav';

class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="board">
        <BoardNav />
        <div className="board-header">
          <p><span>JSA-DESIGN</span></p>
        </div>
        <div className="board-main">

        </div>
      </div>
    );
  }
}

export default BoardScreen;
