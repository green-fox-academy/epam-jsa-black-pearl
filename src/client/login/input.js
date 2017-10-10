'use strict';
import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }
  // verify() {
  //   let username = document.getElementById('username').value;
  //   let password = document.getElementById('password').value;
  //   if (username === '') {
  //     alert('invailed username!');
  //   } else if (password === '') {
  //     alert('password cannot be none!');
  //   } else if (password.length < 6) {
  //     alert('password must be above 6 characters!');
  //   }
  // }
  render() {
    return (
      <form className="input-form">
        <input type="text" id="username" required placeholder="Username/email" ref="username" />
        <input type="password" id="password" required placeholder="Password" ref="password" />
        <input type="submit" value="Login"/>
      </form>
    );
  }
}

export default Input;
