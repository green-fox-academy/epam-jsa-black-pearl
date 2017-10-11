import React from 'react';
import './index.scss';
import LoginForm from '../LoginForm/index.js';

class Login extends React.Component {
  render() {
    <main>
      <header>
        <img src="../../img/black_pearl.png" alt="Black_pearl"/>
        <h1>Welcome Onboard!</h1>
      </header>
      <LoginForm />
      <a href="">Don`t have an account?</a>
    </main>
  }
}

export default Login;
