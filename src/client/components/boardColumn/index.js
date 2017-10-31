import React from 'react';

import './index.scss';
import Card from '../boardCard';
import Menu from '../columnMenu';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isColumnTitleEditing: false,
      isAddCardTitleEditing: false,
      addCardTitleValue: '',
      titleValue: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onAddCardClick = this.onAddCardClick.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.closeDropDownMenu = this.closeDropDownMenu.bind(this);
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

  editColumn() {
    this.setState({isColumnTitleEditing: !this.state.isColumnTitleEditing});
  }

  generateColumnTitle() {
    if (this.state.isColumnTitleEditing) {
      return (
        <section className="column-title-editing">
          <input type="text"
            ref={(c) => {
              this.columnTitleInput = c;
            }}
            onChange={this.onTitleInputChange}/>
          <button className="ok-button"
            onClick={this.renameColumnTitle}>
            √
          </button>
          <button className="cancel-button"
            onClick={this.editColumn}>
            x
          </button>
        </section>
      );
    }
    return (
      <h4 className="column-title">{this.props.column.columnName}</h4>
    );
  }

  generateAddCard() {
    let addCardField = null;

    if (!this.state.isAddCardTitleEditing) {
      addCardField = (
        <div className="add-card"
          onClick={this.onChangeAddCardTitleState.bind(this, true)}>
          Add A Card...
        </div>
      );
    } else {
      addCardField = (
        <div className="add-card">
          <input type="text"
            ref={(c) => {
              this.input = c;
            }}
            onChange={this.onInputChange} />
          <button className="ok-button"
            onClick={this.onAddCardClick}>
            Add
          </button>
          <button className="cancel-button"
            onClick={this.onChangeAddCardTitleState.bind(this, false)}>
            x
          </button>
        </div>
      );
    }

    return addCardField;
  }

  onChangeAddCardTitleState(state) {
    if (state) {
      this.setState({isAddCardTitleEditing: state}, () => {
        this.input.addEventListener('keydown', this.onInputKeyDown.bind(this));
        this.input.focus();
      });
    } else {
      this.input.removeEventListener('keydown', this.onInputKeyDown.bind(this));
      this.setState({isAddCardTitleEditing: state});
    }
  }

  onInputChange(ev) {
    this.setState({addCardTitleValue: ev.target.value});
  }

  onTitleInputChange(ev) {
    this.setState({titleValue: ev.target.value});
  }

  onInputKeyDown(ev) {
    if (ev.keyCode === ENTER_KEY_CODE) {
      this.onAddCardClick();
    } else if (ev.keyCode === ESC_KEY_CODE) {
      this.setState({
        addCardTitleValue: '',
        isAddCardTitleEditing: false,
      });
    }
  }

  onAddCardClick() {
    if (this.state.addCardTitleValue) {
      this.props.addCard(this.props.column._id, this.state.addCardTitleValue);
    }
    this.setState({
      addCardTitleValue: '',
      isAddCardTitleEditing: false,
    });
  }

<<<<<<< HEAD
  renameColumnTitle() {
    console.log(this.state.titleValue);
    this.setState({isColumnTitleEditing: false});
=======
  handleDragStart(ev) {
    this.closeDropDownMenu();
    ev.dataTransfer.setData('text', this.props.column._id);
    ev.target.style.opacity = '0.5';
  }

  handleDrag(ev) {
    return;
  }

  handleDragEnd(ev) {
    ev.target.style.opacity = '1.0';
  }

  handleDragEnter(ev) {
    if (this.wrapper.contains(ev.target)) {
      this.wrapper.style.border = '2px dashed #026aa7';
    }
  }

  handleDragOver(ev) {
    ev.preventDefault();
    this.wrapper.style.border = '2px dashed #026aa7';
  }

  handleDragLeave(ev) {
    this.wrapper.style.border = '';
  }

  handleDrop(ev) {
    this.wrapper.style.border = '';
    let sourceColumnId = ev.dataTransfer.getData('Text');

    if (this.props.column._id === sourceColumnId) {
      return;
    }

    this.props.reorderColumns(sourceColumnId, this.props.column._id);
>>>>>>> develop
  }

  render() {
    let cardDisplay = [];
    let addCard = this.generateAddCard();
    let columnTitle = this.generateColumnTitle();

    if (Array.isArray(this.props.column.cards)) {
      this.props.column.cards.forEach(function(element) {
        cardDisplay.push(
          <Card card={element} key={element._id} />
        );
      }, this);
    }

    return (
      <div className="board-column-wrapper"
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        ref={(elem) => {
          this.wrapper = elem;
        }}>
        <div className="board-column" draggable="true"
          onDragStart={this.handleDragStart}
          onDrag={this.handleDrag}
          onDragEnd={this.handleDragEnd}>
          <div className="column-header">
            {columnTitle}
            <div className={this.state.isColumnTitleEditing ?
              'display-none' : 'edit-icon'}
            ref={(elem) => {
              this.editIcon = elem;
            }}>
            </div>
            {this.state.isEditing ?
              <Menu
                columnId={this.props.column._id}
                closeDropDownMenu={this.closeDropDownMenu}
                deleteColumn={this.props.deleteColumn}
                editColumn={this.editColumn.bind(this)}
                isEditing={this.state.isEditing} /> :
              null}
          </div>
          <div>
            {cardDisplay}
          </div>
          {addCard}
        </div>
      </div>
    );
  }
}

export default List;
