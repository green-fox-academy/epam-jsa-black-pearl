import React from 'react';

import './index.scss';

class ColumnMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('mousedown',
      this.handleClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown',
      this.handleClickOutside.bind(this));
  }

  handleClickOutside(ev) {
    if (this.menu && !this.menu.contains(ev.target)) {
      this.props.closeDropDownMenu();
    }
  }

  render() {
    if (this.props.isEditing) {
      return (
        <div className="column-menu"
          ref={(elem) => {
            this.menu = elem;
          }}>
          <p>Column Actions</p>
          <hr />
          <ul className="column-menu-list">
            <li>Rename Column</li>
            <li>Add Card</li>
            <li onClick={this.props.deleteColumn.bind(this,
              this.props.columnId)}>
              Delete Column
            </li>
            <li>Move Column To</li>
          </ul>
        </div>
      );
    }
    return null;
  }
}

export default ColumnMenu;
