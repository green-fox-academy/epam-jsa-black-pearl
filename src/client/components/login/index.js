import React from 'react';
import {Link} from 'react-router-dom';
import './index.scss';
import LoginForm from '../loginForm';
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
        <p>Don`t have an account? <Link to={'/register'}>Sign up</Link></p>
      </main>
    );
  }
}

export default Login;
