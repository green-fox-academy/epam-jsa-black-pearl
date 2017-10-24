import React from 'react';

import './index.scss';

class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="board-card">
        <p className="card-title">{this.props.card.cardname}</p>
        <p className="card-subtitle">{this.props.card.cardsubname}</p>
        <div className="card-info">
          <div className="card-footer">
            <span className="card-tag">
              {this.props.card.tag}
            </span>
            <span className="card-stat">
              lorem ipsum
            </span>
            <div className="card-users">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
