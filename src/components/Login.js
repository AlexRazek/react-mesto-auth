import React, { useState } from "react";
import "../index.css";

const Login = ({ onLogin }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

    const handleSubmit = (e) => {
      e.preventDefault();
      onLogin(formValue.email, formValue.password);
      setFormValue({ email: "", password: "" });
    }

  return (
    <div className="auth">
      <p className="auth__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          required
          id="email"
          className="auth__input"
          placeholder="Email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          minLength="5"
          maxLength="30"
        />
        <input
          required
          id="password"
          className="auth__input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          minLength="6"
          maxLength="30"
        />
        <div className="auth__button-container">
          <button type="submit" className="auth__link">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
