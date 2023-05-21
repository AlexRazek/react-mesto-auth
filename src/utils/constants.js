export const enablesValidation = {
  formSelector: ".popup__input",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__input-error_active",
};

export const popupOpenEditBtn = document.querySelector(
  ".profile__info-edit-button"
);
export const popupAddCardBtn = document.querySelector(".profile__add-button");
export const popupDeleteCardBtn = document.querySelector(
  ".popup__submit-btn_delete"
);

export const popupAvatarBtn = document.querySelector(".profile__avatar-button");

export const popupEditContainer = document.querySelector(".popup_type_profile");
export const popupCardContainer = document.querySelector(
  ".popup_type_card-add"
);
export const popupAvatarContainer = document.querySelector(
  ".popup_type_update-profile"
);
export const popupAlertContainer = document.querySelector(
  ".popup_type_card-delete"
);
export const popupImageContainer = document.querySelector(
  ".popup_type_picture"
);

export const profileTitle = document.querySelector(".profile__info-title");
export const profileSubtitle = document.querySelector(
  ".profile__info-subtitle"
);
export const profileAvatar = document.querySelector(".profile__avatar");

export const formEditElement = document.forms["form-popup"];
export const formCardElement = document.forms["form-card"];
export const elementsCardContainer = document.querySelector(".elements");
export const nameInput = document.querySelector(".popup__text_type_name");
export const jobInput = document.querySelector(".popup__text_type_about");
export const nameCardInput = document.querySelector(
  ".popup__text_type_namecard"
);
export const linkCardInput = document.querySelector(
  ".popup__text_type_linkcard"
);
export const openImage = document.querySelector(".popup__image-view");
export const openImageTitle = document.querySelector(".popup__image-title");

export const popupContainers = document.querySelectorAll(".popup");
export const closeButtons = document.querySelectorAll(".popup__closed");
export const buttonCard = document.querySelector("#btn-card");
export const popupCardFormContainer = document.querySelector("#card-popup");
export const cardName = document.querySelector(".element__title");

export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".element");

// const popupCloseEditBtn = document.querySelector('.popup__closed');
// const popupCloseCardBtn = document.querySelector('#popup-addcard .popup__closed');
// const popupCloseImageBtn = document.querySelector('#popup-image .popup__closed');
// const popupImageViewContainer = document.querySelector('.popup__image-container');
