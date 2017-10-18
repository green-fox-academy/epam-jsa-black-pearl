import React from 'react';

import './index.scss';
import BoardNav from '../boardNav';
import BoardColumn from '../boardColumn';
import data from './data.json';

class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: null};
  }

  componentWillMount() {
    this.setState({data: data});
  }

  addColumn() {
    let json = this.state.data;

    json.columns.push({
      'id': '8k12dijk',
      'columnTitle': 'To-do',
      'events': [
        {
          'id': '',
          'eventTitle': 'Kick-Ass',
          'eventSubtitle': 'sssssmoking~~',
          'postTime': 173894127934,
          'due': 173912384082,
          'tag': 'coming',
          'assignedMembers': [],
          'appendix': [],
          'comments': '',
        },
      ],
    });

    this.setState({data: json});
  }

  render() {
    let boardDisplay = [];

    this.state.data.columns.forEach(function(element) {
      boardDisplay.push(
        <BoardColumn column={element} key={element.id} />
      );
    }, this);

    return (
      <div className="board">
        <BoardNav />
        <div className="board-header">
          <p><span className="board-name">{data.boardname}</span></p>
        </div>
        <div className="board-main">
          {boardDisplay}
          <div className="add-column">
            <div className="board-column-wrapper">
              <div className="board-column">
                <div className="column-header"
                  onClick={this.addColumn.bind(this)}>
                  Add A Column...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardScreen;
