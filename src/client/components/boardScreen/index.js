import React from 'react';

import './index.scss';
import BoardNav from '../boardNav';
import BoardList from '../boardList';
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

  showBoardDetail(id) {
    this.props.history.push('/boards/' + id);
  }

  onChangeAddColumnTitleState(state) {
    this.setState({isAddColumnTitleEditing: state}, () => {
      this.input.focus();
    });
  }

  onInputChange(ev) {
    this.setState({addColumnTitleValue: ev.target.value});
  }

  generateBoardList() {
    let list = [];

    data.forEach(function(element) {
      list.push(
        <BoardList
          boardId={element.id}
          boardName={element.boardname}
          showBoardDetail={this.showBoardDetail.bind(this, element.id)}
          key={element.id}
        />
      );
    }, this);

    return list;
  }

  render() {
    let list = this.generateBoardList();

    return (
      <div className="board">
        <BoardNav />
        <div className="board-main-list">
          {list}
        </div>
      </div>
    );
  }
}

export default BoardScreen;
