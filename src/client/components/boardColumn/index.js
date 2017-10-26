import React from 'react';

import './index.scss';
import Card from '../boardCard';
import Menu from '../columnMenu';
import $api from '../../api/api.json';
import {sendGetHttpRequest, sendPostHttpRequest, sendDeleteHttpRequest}
  from '../../controller/httpRequest.js';

const SUCCESSFUL_RESPONSE = /^20[0-6]$/;

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isAddCardTitleEditing: false,
      addCardTitleValue: '',
    };
  }

  componentDidMount() {
    let that = this;

    that.editIcon.addEventListener('click', (ev) => {
      ev.stopPropagation();
      that.toggleDropDownMenu();
    });
  }

  componentWillUnmount() {
    let that = this;

    that.editIcon.removeEventListener('click', (ev) => {
      ev.stopPropagation();
      that.toggleDropDownMenu();
    });
  }

  toggleDropDownMenu() {
    this.setState({isEditing: !this.state.isEditing});
  }

  closeDropDownMenu() {
    this.setState({isEditing: false});
  }

  addCard() {
    let reqObj = {cardName: this.state.addCardTitleValue};

    sendPostHttpRequest($api.boards + '/' + this.props.match.params.id +
      '/columns/' + this.props.column._id + '/cards', reqObj)
      .then((res) => {
        if (SUCCESSFUL_RESPONSE.test(res.status)) {
          sendGetHttpRequest($api.boards + '/' + this.props.match.params.id)
            .then((result) => {
              this.setState({data: result});
            });
        }
      });

    this.setState({
      addCardTitleValue: '',
      isAddCardTitleEditing: false,
    });
  }

  generateAddCard() {
    let addCard = null;

    if (!this.state.isAddCardTitleEditing) {
      addCard = (
        <div className="add-column"
          onClick={this.onChangeAddCardTitleState.bind(this, true)}>
          Add A Card...
        </div>
      );
    } else {
      addCard = (
        <div className="add-column">
          <input type="text"
            ref={(c) => {
              this.input = c;
            }}
            onChange={this.onInputChange.bind(this)} />
          <button className="ok-button"
            onClick={this.addCard}>
            √
          </button>
          <button className="cancel-button"
            onClick={this.onChangeAddCardTitleState.bind(this, false)}>
            x
          </button>
        </div>
      );
    }

    return addCard;
  }

  onChangeAddCardTitleState(state) {
    if (state) {
      this.setState({isAddCardTitleEditing: state}, () => {
        this.input.focus();
      });
    } else {
      this.setState({isAddCardTitleEditing: state});
    }
  }

  onInputChange(ev) {
    this.setState({addCardTitleValue: ev.target.value});
  }

  render() {
    let cardDisplay = [];
    let addCard = this.generateAddCard();

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
            <h4 className="column-title">{this.props.column.columnName}</h4>
            <div className="edit-icon"
              ref={(elem) => {
                this.editIcon = elem;
              }}>
            </div>
            {this.state.isEditing ?
              <Menu
                columnId={this.props.column._id}
                closeDropDownMenu={this.closeDropDownMenu.bind(this)}
                deleteColumn={this.props.deleteColumn}
                isEditing={this.state.isEditing} /> :
              null}
          </div>
          <div>
            {cardDisplay}
          </div>
          <div className="add-card">
            {addCard}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
