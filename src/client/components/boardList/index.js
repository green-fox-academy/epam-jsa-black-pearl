import React from 'react';
import './index.scss';

class BoardList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="board-list"
        onClick={this.props.showBoardDetail}>
        <p
          className="board-name"
          title={this.props.boardName}>{this.props.boardName}</p>
        <p className="board-id">#{this.props.boardId}</p>
      </div>
    );
  }
}

export default BoardList;
