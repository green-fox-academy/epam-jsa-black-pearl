import React from 'react';

import './index.scss';
import Card from '../boardCard';
import Menu from '../columnMenu';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isEditing: false};
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
            <div className="column-title">{this.props.column.columnName}</div>
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
            <a>Add A Card...</a>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
