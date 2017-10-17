import React from 'react';
import './index.scss';
import Card from '../boardCard';

class List extends React.Component {
  render() {
    return (
      <div className="list">
        <p>Backlog</p>
        <Card />
      </div>
    )
  }
}

export default List;