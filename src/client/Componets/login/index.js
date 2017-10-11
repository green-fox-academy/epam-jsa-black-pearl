import React from 'react';
import './index.scss';
import LoginForm from '../loginForm/index.js';

class Login extends React.Component {
  render() {
    return (
      <main>
        <header>
          <img src="../../img/black_pearl.png" alt="Black_pearl"/>
          <h1>Welcome Onboard!</h1>
        </header>
        <LoginForm />
        <p>Don`t have an account?<a href=""> Sign up>></a></p>
      </main>
    );
  }
}

export default Login;
