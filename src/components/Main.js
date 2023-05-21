import "../index.css";
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile" aria-label="профиль">
        <button
          type="button"
          onClick={props.onAddPlace}
          aria-label="добавить новую картинку"
          className="profile__add-button"
        />
        <div className="profile__avatar-container">
          <img src={currentUser.avatar} className="profile__avatar" alt="фотография пользователя" />
          <button
            type="button"
            onClick={props.onEditAvatar}
            aria-label="загрузка нового аватара"
            className="profile__avatar-button"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <h2 className="profile__info-subtitle">{currentUser.about}</h2>
          <button
            type="button"
            onClick={props.onEditProfile}
            aria-label="редактировать данные"
            className="profile__info-edit-button"
          />
        </div>
      </section>
      <section className="elements" aria-label="элементы">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
            name={card.name}
            link={card.link}
            likes={card.likes.length}
            card={card}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
