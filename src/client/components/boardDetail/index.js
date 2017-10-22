import React from 'react';

import BoardNav from '../boardNav';
import BoardColumn from '../boardColumn';
import data from './columndata.json';
import './index.scss';

class BoardDetail extends React.Component {
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
    let tempColumns = this.state.data.columns;

    let id = Date.now();

    tempColumns.columns.push({
      'id': id,
      'columnTitle': this.state.addColumnTitleValue,
      'events': [],
    });

    this.setState({
      data: tempColumns,
      addColumnTitleValue: '',
      isAddColumnTitleEditing: false,
    });
  }

  generateBoardColumn() {
    let boardDisplay = [];

    this.state.data.columns.forEach(function(element) {
      boardDisplay.push(
        <BoardColumn column={element} key={element._id} />
      );
    }, this);

    return boardDisplay;
  }

  generateAddColumn() {
    let addColumn = null;

    if (!this.state.isAddColumnTitleEditing) {
      addColumn = (
        <div className="add-column"
          onClick={this.onChangeAddColumnTitleState.bind(this, true)}>
          Add A Column...
        </div>
      );
    } else {
      addColumn = (
        <div className="add-column">
          <input type="text"
            ref={(c) => {
              this.input = c;
            }}
            onChange={this.onInputChange.bind(this)} />
          <button className="ok-button"
            onClick={this.addColumn.bind(this)}>
            √
          </button>
          <button className="cancel-button"
            onClick={this.onChangeAddColumnTitleState.bind(this, false)}>
          </button>
        </div>
      );
    }

    return addColumn;
  }

  onChangeAddColumnTitleState(state) {
    if (state) {
      this.setState({isAddColumnTitleEditing: state}, () => {
        this.input.focus();
      });
    } else {
      this.setState({isAddColumnTitleEditing: state});
    }
  }

  onInputChange(ev) {
    this.setState({addColumnTitleValue: ev.target.value});
  }

  render() {
    let boardDisplay = this.generateBoardColumn();

    let addColumn = this.generateAddColumn();

    return (
      <div className="board">
        <BoardNav />
        <div className="board-header">
          <p><span className="board-name">{this.state.data.boardname}</span></p>
        </div>
        <div className="board-main">
          {boardDisplay}
          <div className="board-column-wrapper">
            <div className="board-column">
              {addColumn}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardDetail;
