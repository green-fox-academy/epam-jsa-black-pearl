import React from 'react';
import './index.scss';

class RegisterForm extends React.Component {
  render() {
    return (
      <form className="register-form">
        <input type="email" required placeholder="Email" />
        <input type="password" required placeholder="Password" />
        <input type="submit" value="Sign up"/>
      </form>
    );
  }
}

export default RegisterForm;
