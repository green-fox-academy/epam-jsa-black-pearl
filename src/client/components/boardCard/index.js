import React from 'react';
import './index.scss';

class Cards extends React.Component {
  render() {
    return (
      <div className="board-card">
        <p className="card-title">Lorem ipsum</p>
        <p className="card-subtitle">Lorem ipsum</p>
        <div className="card-info">
          <div className="card-footer">
            <span className="card-tag">
              Get on
            </span>
            <span className="card-stat">
              lorem ipsum
            </span>
            <div className="card-users">
              {/* <img src="" alt="" /> */}
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
