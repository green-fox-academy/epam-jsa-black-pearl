import React from 'react';
import './index.scss';

class LoginForm extends React.Component {
  render() {
    return (
      <form className="login-form">
        <input type="email" required placeholder="Email" />
        <input type="password" required placeholder="Password" />
        <input type="submit" value="Login"/>
      </form>
    );
  }
}

export default LoginForm;
