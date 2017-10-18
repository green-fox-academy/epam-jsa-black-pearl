import React from 'react';
import './index.scss';

class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="board-card">
        <p className="card-title">{this.props.card.eventTitle}</p>
        <p className="card-subtitle">{this.props.card.eventSubtitle}</p>
        <div className="card-info">
          <div className="card-footer">
            <span className="card-tag">
              {this.props.card.tag}
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
