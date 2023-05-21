import "../index.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Main from "../components/Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import * as auth from "../utils/auth.js";
import { api } from "../utils/utils.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState({
    isOpenImage: false,
  });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = useState(false);
  const [isRegister, setisRegister] = useState(false);
  const [isEmail, setisEmail] = useState("");

  // const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      console.log(jwt);
      auth.checkToken(jwt).then((info) => {
        if (info) {
          console.log(info.data.email);
          setLoggedIn(true);
          setisEmail(info.data.email);
          // navigate('/');
        }
      });
    }
  }, [loggedIn]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        console.log(userData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке информации о пользователе: ${err}`); // выведем ошибку в консоль
      });
  }, []);

  useEffect(() => {
    api
      .getAllCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке карточек: ${err}`); // выведем ошибку в консоль
      });
  }, []);

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    // setselectedCard(card)
    setselectedCard({
      ...card,
      isOpenImage: true,
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка при установке лайка: ${err}`); // выведем ошибку в консоль
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки: ${err}`); // выведем ошибку в консоль
      });
  }

  function handleAddPlaceSubmit(dataNewCard) {
    // console.log(dataNewCard)
    api
      .addNewCard(dataNewCard)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении карточки: ${err}`); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar(dataAvatar) {
    // console.log(dataAvatar)
    api
      .editAvatarInfo(dataAvatar)
      .then((avatar) => {
        console.log(avatar);
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных аватара: ${err}`); // выведем ошибку в консоль
      });
  }

  function handleUpdateUser(users) {
    api
      .editUserInfo(users)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных пользователя: ${err}`); // выведем ошибку в консоль
      });
  }

  function closeAllPopups() {
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setselectedCard(false);
    setisInfoTooltipOpen(false);
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <Routes>
            <Route
                path="*"
                element={
                  loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
                }
            />
            <Route
              exact
              path="/"
              element={
                <>
                  <Header
                    loggedIn={loggedIn}
                    isEmail={isEmail}
                    setLoggedIn={setLoggedIn}
                    text={"Выйти"}
                    route={"/"}
                  />
                  <ProtectedRouteElement
                    element={Main}
                    loggedIn={loggedIn}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    cards={cards}
                  ></ProtectedRouteElement>
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Header text={"Войти"} route={"/signin"} />
                  <Register
                    setisRegister={setisRegister}
                    setisInfoTooltipOpen={setisInfoTooltipOpen}
                  />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Header text={"Регистрация"} route={"/signup"} />
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    setisRegister={setisRegister}
                    setisInfoTooltipOpen={setisInfoTooltipOpen}
                  />
                </>
              }
            />
          </Routes>
          <Footer />
          {/* <!-- попап добавления карточки --> */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          {/* <!-- попап редактирования аватара --> */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {/* <!-- попап редактирования профиля --> */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          {/* <!-- попап удаления карточки --> */}
          <PopupWithForm
            onClose={closeAllPopups}
            name={"card-delete"}
            type={"deletecard"}
            title={"Вы уверены?"}
            buttonText={"Да"}
          />
          {/* <!-- попап увеличения карточки --> */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          {/* <!-- попап информация об удачной или нет - регистрации --> */}
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            register={isRegister}
          />
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
