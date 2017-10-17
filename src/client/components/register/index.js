import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {Link} from 'react-router-dom';
import './index.scss';
import RegisterForm from '../registerForm';
import img from '../../../img/black_pearl.png';

function onChange(value) {
  console.log('Captcha value:', value);
}

class Register extends React.Component {
  render() {
    return (
      <main className="login-main">
        <header>
          <img src={img} alt="Logo of Black Pearl"/>
          <h1>Sign Up</h1>
        </header>
        <RegisterForm />
        <div className="recaptcha">
          <ReCAPTCHA ref="recaptcha" sitekey="6LfMtzQUAAAAAMD920qYn8GBmjBKgv5QeOW_u2gH" onChange={onChange} />,
        </div>
        <p>Already have an account? <Link to={'/login'}>Login here</Link></p>
      </main>
    );
  }
}

export default Register;
