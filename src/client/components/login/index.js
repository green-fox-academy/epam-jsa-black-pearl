import React from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import './index.scss';
import LoginForm from '../loginForm';
import img from '../../../img/black_pearl.png';
import isLoggedIn from '../../controller/isLoggedIn';

class Login extends React.Component {
  render() {
    if (isLoggedIn()) {
      return (
        <Redirect to="/board" />
      );
    }
    return (
      <main className="loginMain">
        <header>
          <img src={img} alt="Logo of Black Pearl"/>
          <h1>welcome onboard!</h1>
        </header>
        <LoginForm />
        <p>Don`t have an account? <Link to={'/register'}>Sign up</Link></p>
      </main>
    );
  }
}

export default Login;
