import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";
import "../index.css";

const Login = ({ handleLogin, setisInfoTooltipOpen }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      // console.log(formValue.email);
      return;
    }

    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setFormValue({ email: "", password: "" });
          handleLogin();
          navigate("/");
        }
      })
      .catch(() => setisInfoTooltipOpen(true));
  };

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
