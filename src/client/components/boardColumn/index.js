import React from 'react';

import './index.scss';
import Card from '../boardCard';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cardDisplay = [];

    if (Array.isArray(this.props.column.cards)) {
      this.props.column.cards.forEach(function(element) {
        cardDisplay.push(
          <Card card={element} key={element._id} />
        );
      }, this);
    }

    return (
      <div className="board-column-wrapper">
        <div className="board-column">
          <div className="column-header">
            <div className="edit-icon"></div>
            <div className="column-title">{this.props.column.columnname}</div>
            <div className="column-card-count">
              {Array.isArray(this.props.column.cards) ?
                this.props.column.cards.length : '0'}
            </div>
          </div>
          <div>
            {cardDisplay}
          </div>
          <div className="add-card">
            <a>Add A Card...</a>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
