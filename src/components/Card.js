import "../index.css";
import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }

  return (
    <>
      <div className="element" key={props._id}>
        <img onClick={ handleClick } src = {props.link}  className="element__image" alt="картинка"/>
        <h2 className="element__title">{props.name}</h2>
        {/* Далее в разметке используем переменную для условного рендеринга */}
        {isOwn && (
          <button
            type="button"
            className="element__trash"
            onClick={handleDeleteClick}
            aria-label="корзина"
          />
        )}
        {/* <button type="button" aria-label="корзина" className="element__trash" /> */}
        <div className="element__like-container">
          <button
            type="button"
            aria-label="нравиться"
            className={cardLikeButtonClassName}
            onClick={handleLike}
          />
          {/* <button type="button" aria-label="нравится" className="element__like" /> */}
          <p className="element__like-counter">{props.likes}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
