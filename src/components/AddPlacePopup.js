import "../index.css";
import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const cardNameRef = useRef();
  const cardLinkRef = useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  }

  useEffect(() => {
    cardNameRef.current.value = "";
    cardLinkRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={"card-add"}
      type={"card"}
      title={"Новое место"}
      buttonText={"Создать"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="namecard"
        name="namecard"
        placeholder="Название"
        ref={cardNameRef}
        // value=""
        className="popup__text popup__text_type_namecard"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__imput-error namecard-input-error"></span>
      <input
        type="url"
        id="linkcard"
        name="linkcard"
        placeholder="Ссылка на картинку"
        ref={cardLinkRef}
        // value=""
        className="popup__text popup__text_type_linkcard"
        required
      />
      <span className="popup__imput-error linkcard-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
