import React from 'react';

import './index.scss';
import Card from '../boardCard';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cardDisplay = [];

    this.props.column.cards.forEach(function(element) {
      cardDisplay.push(
        <Card card={element} key={element._id} />
      );
    }, this);

    return (
      <div className="board-column-wrapper">
        <div className="board-column">
          <div className="column-header">
            <div className="edit-icon"></div>
            <div className="column-title">{this.props.column.columnname}</div>
            <div className="column-card-count">
              {this.props.column.cards.length}
            </div>
          </div>
          <div>
            {cardDisplay}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
