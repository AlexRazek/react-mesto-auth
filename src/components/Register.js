import React, {useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import "../index.css";

const Register = (props) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue.password){
      auth.register
      (
        formValue.email, 
        formValue.password
        )
      .then((res) => {
        props.setisRegister(true);
        props.setisInfoTooltipOpen(true);
        navigate('/signin');
        })
      .catch(() => props.setisInfoTooltipOpen(true));
    }
  }

  return (
    <div className="auth">
      <p className="auth__welcome">
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className="auth__form">
        <input 
            id="email" 
            className="auth__input"
            placeholder="Email"
            name="email" 
            type="email" 
            value={formValue.email} 
            onChange={handleChange} 
            minLength="5"
            maxLength="30"
            required
            />
        <input 
            id="password" 
            className="auth__input"
            placeholder="Пароль"
            name="password" 
            type="password" 
            value={formValue.password} 
            onChange={handleChange}
            minLength="6"
            maxLength="30"
            required
            />
        <div className="auth__button-container">
          <button type="submit" onSubmit={handleSubmit} className="auth__link">Зарегистрироваться</button>
        </div>
      </form>
      {/* <div className="auth__signin"> */}
        <p className="auth__signin">Уже зарегистрированы?<Link to="/signin" className="auth__login-link"> Войти</Link></p>
      {/* </div> */}
    </div>
  );
}

export default Register;