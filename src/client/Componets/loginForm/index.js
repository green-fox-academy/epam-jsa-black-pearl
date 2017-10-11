import React from 'react';
import './index.scss';

class LoginForm extends React.Component {
  render() {
    return (
      <form className="login-form">
        <input type="email" required placeholder="email" ref="username" />
        <input type="password" required placeholder="Password" ref="password" />
        <input type="submit" value="Login"/>
      </form>
    );
  }
}

export default LoginForm;
