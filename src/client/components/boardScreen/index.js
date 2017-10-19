import React from 'react';
import './index.scss';
import BoardNav from '../boardNav';

class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <BoardNav />
        <p>JSA - Design<span>Alex Alfred Chris</span></p>
      </div>
    );
  }
}

export default BoardScreen;
