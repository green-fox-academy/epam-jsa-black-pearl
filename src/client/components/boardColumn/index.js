import React from 'react';

import './index.scss';
import Card from '../boardCard';

class List extends React.Component {
  render() {
    return (
      <div className="board-column-wrapper">
        <div className="board-column">
          <div className="column-header">
            <div className="edit-icon"></div>
            <div className="column-title">To-do</div>
            <div className="column-card-count">2</div>
          </div>
          <div>
            <Card />
            <Card />
          </div>
        </div>
      </div>
    );
  }
}

export default List;
