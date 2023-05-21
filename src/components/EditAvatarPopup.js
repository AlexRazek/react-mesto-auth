import "../index.css";
import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

// работаем через useRef
function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name={"update-profile"}
      type={"updateavatar"}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
    >
      <input
        type="url"
        id="linkavatar"
        name="linkavatar"
        placeholder="Ссылка на фотографию"
        // value={ avatar }
        ref={avatarRef}
        // onChange={ handleAvatar }
        className="popup__text popup__text_type_avatar"
        required
        minLength="5"
        maxLength="250"
      />
      <span className="popup__imput-error linkavatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
