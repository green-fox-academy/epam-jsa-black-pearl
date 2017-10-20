import React from 'react';

import './index.scss';
import BoardNav from '../boardNav';
import BoardList from '../boardList';
// import data from './data.json';
import $api from '../../api/api.json';

class BoardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isAddBoardEditing: false,
      addBoardValue: '',
    };
  }

  componentDidMount() {
    this.sendHttpRequest();
  }

  formHttpGetRequest(path) {
    let httpHeaders = {
      'Content-Type': 'application/json',
      'token': localStorage.token,
    };
    let myHeaders = new Headers(httpHeaders);
    let myRequest = new Request(path, {
      'method': 'GET',
      'headers': myHeaders,
    });

    return myRequest;
  }

  sendHttpRequest() {
    let that = this;

    fetch(this.formHttpGetRequest($api.boards)).then(function(res) {
      return res.json();
    }).then(function(result) {
      that.setState({data: result.boards});
    });
  }

  addBoard() {
    let json = this.state.data;

    json.push({
      'id': '1ksj9smi',
      'username': 'test@test.com',
      'boardname': this.state.addBoardValue,
      'members': [],
      'columns': [
        {
          'id': '8k12dijj',
          'columnTitle': 'To-do',
          'events': [],
        },
      ],
    });

    this.setState({
      data: json,
      isAddBoardEditing: false,
    });
  }

  showBoardDetail(id) {
    this.props.history.push('/boards/' + id);
  }

  onChangeAddBoardState(state) {
    if (state) {
      this.setState({isAddBoardEditing: state}, () => {
        this.input.focus();
      });
    } else {
      this.setState({isAddBoardEditing: state});
    }
  }

  onInputChange(ev) {
    this.setState({addBoardValue: ev.target.value});
  }

  generateBoardListComponent() {
    let list = [];

    this.state.data.forEach(function(element) {
      list.push(
        <BoardList
          boardId={element._id}
          boardName={element.boardname}
          showBoardDetail={this.showBoardDetail.bind(this, element._id)}
          key={element._id}
        />
      );
    }, this);

    return list;
  }

  generateAddBoardComponent() {
    if (!this.state.isAddBoardEditing) {
      return (
        <div className="board-add-list"
          onClick={this.onChangeAddBoardState.bind(this, true)}>
          <p className="board-name">Add A Board...</p>
          <p className="board-id">#</p>
        </div>
      );
    }

    return (
      <div className="board-add-list">
        <p>
          <input type="text"
            ref={(c) => {
              this.input = c;
            }}
            onChange={this.onInputChange.bind(this)} />
        </p>
        <p>
          <button
            onClick={this.addBoard.bind(this)}>
            √
          </button>
          <button
            onClick={this.onChangeAddBoardState.bind(this, false)}>
            ×
          </button>
        </p>
      </div>
    );
  }

  render() {
    let list = this.generateBoardListComponent();

    let addList = this.generateAddBoardComponent();

    return (
      <div className="board">
        <BoardNav />
        <div className="board-main-list">
          {list}
          {addList}
        </div>
      </div>
    );
  }
}

export default BoardScreen;
