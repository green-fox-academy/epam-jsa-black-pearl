import React from 'react';
import './scss/input.scss';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form className="input-form">
        <input type="text" title="username" id="username" required placeholder="Username/email" ref="username" />
        <input type="password" title="password" id="password" required placeholder="Password" ref="password" />
        <input type="submit" value="Login"/>
      </form>
    );
  }
}

export default Input;
