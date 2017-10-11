import React from 'react';
import './index.scss';
import LoginForm from '../LoginForm';
import img from '../../../img/black_pearl.png';

class Login extends React.Component {
  render() {
    return (
      <main>
        <header>
          <img src={img} alt="Logo of Black Pearl"/>
          <h1>Welcome Onboard!</h1>
        </header>
        <LoginForm />
        <p>Don`t have an account? <a href="">Sign up</a></p>
      </main>
    );
  }
}

export default Login;
