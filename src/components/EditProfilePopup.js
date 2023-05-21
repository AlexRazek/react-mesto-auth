import "../index.css";
import React, { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"profile"}
      type={"popup"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="nameauthor"
        name="nameauthor"
        placeholder="О себе"
        value={ name || ''}
        onChange={handleName}
        className="popup__text popup__text_type_name"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__imput-error nameauthor-input-error"></span>
      <input
        type="text"
        id="aboutauthor"
        name="aboutauthor"
        placeholder="Чем занимаетесь"
        value={ description || '' }
        onChange={handleDescription}
        className="popup__text popup__text_type_about"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__imput-error aboutauthor-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
