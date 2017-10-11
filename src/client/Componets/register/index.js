import React from 'react';
import './index.scss';
import RegisterForm from '../registerForm';
import img from '../../../img/black_pearl.png';

class Register extends React.Component {
  render() {
    return (
      <main>
        <header>
          <img src={img} alt="Logo of Black Pearl"/>
          <h1>Sign Up for Free</h1>
        </header>
        <RegisterForm />
        <p>Already have an account? <a href="">Login here</a></p>
      </main>
    );
  }
}

export default Register;