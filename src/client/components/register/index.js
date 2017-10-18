import React from 'react';

import {Link} from 'react-router-dom';
import './index.scss';
import RegisterForm from '../registerForm';
import img from '../../../img/black_pearl.png';

class Register extends React.Component {
  render() {
    return (
      <main className="login-main">
        <header>
          <img src={img} alt="Logo of Black Pearl"/>
          <h1>Sign Up</h1>
        </header>
        <RegisterForm />
        <p>Already have an account? <Link to={'/login'}>Login here</Link></p>
      </main>
    );
  }
}

export default Register;
