import React from 'react';

import './index.scss';
import BoardNav from '../boardNav';
import BoardColumn from '../boardColumn';
import data from './data.json';

class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isAddColumnTitleEditing: false,
      addColumnTitleValue: '',
    };
  }

  componentWillMount() {
    this.setState({data: data});
  }

  addColumn() {
    let json = this.state.data;

    json.columns.push({
      'id': '8k12dijk',
      'columnTitle': this.state.addColumnTitleValue,
      'events': [],
    });

    this.setState({
      data: json,
      isAddColumnTitleEditing: false,
    });
  }

  onChangeAddColumnTitleState(state) {
    this.setState({isAddColumnTitleEditing: state});
  }

  onInputChange(ev) {
    this.setState({addColumnTitleValue: ev.target.value});
  }

  generateBoardColumn() {
    let boardDisplay = [];

    this.state.data.columns.forEach(function(element) {
      boardDisplay.push(
        <BoardColumn column={element} key={element.id} />
      );
    }, this);

    return boardDisplay;
  }

  generateAddColumn() {
    let addColumn = null;

    if (!this.state.isAddColumnTitleEditing) {
      addColumn = (
        <div className="column-header"
          onClick={this.onChangeAddColumnTitleState.bind(this, true)}>
          Add A Column...
        </div>
      );
    } else {
      addColumn = (
        <div className="column-header">
          <input type="text"
            onChange={this.onInputChange.bind(this)} />
          <button
            onClick={this.addColumn.bind(this)}>
            √
          </button>
          <button
            onClick={this.onChangeAddColumnTitleState.bind(this, false)}>
            ×
          </button>
        </div>
      );
    }

    return addColumn;
  }

  render() {
    let boardDisplay = this.generateBoardColumn();

    let addColumn = this.generateAddColumn();

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
                {/* <div className="column-header"
                  onClick={this.addColumn.bind(this)}>
                  Add A Column...
                </div> */}
                {addColumn}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardScreen;
