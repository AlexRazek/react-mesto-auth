import "../index.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate} from "react-router-dom";
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
import auth_error from "../images/auth_error.svg";
import auth_success from "../images/auth_success.svg";

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
  const [userEmail, setuserEmail] = useState("");
  // стейт для передачи сообщений об авторизации, успешной и не очень
  const [noticeMassage, setnoticeMassage] = useState({image:'', text:''});

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
      .then((info) => {
        if (info) {
          setLoggedIn(true);
          setuserEmail(info.data.email);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(`Ошибка при проверке токена: ${err}`); // выведем ошибку в консоль
      });
    }
  }, [loggedIn, navigate]);

  const handleLoginSet = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    if(loggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка при загрузке информации о пользователе: ${err}`); // выведем ошибку в консоль
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if(loggedIn) {
      api
        .getAllCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(`Ошибка при загрузке карточек: ${err}`); // выведем ошибку в консоль
        });
      }   
  }, [loggedIn]);

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
    api
      .addNewCard(dataNewCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении карточки: ${err}`); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar(dataAvatar) {
    api
      .editAvatarInfo(dataAvatar)
      .then((avatar) => {
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

  function handleLogin(email, password) {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          handleLoginSet();
          navigate("/");
        }
      })
      .catch(() => {
        setnoticeMassage({image: auth_error, text: "Что-то пошло не так! Попробуйте ещё раз."});
        setisInfoTooltipOpen(true);
        setisRegister(false);
      });
  };

  function handleRegister (email, password) {
    if (password){
      auth.register
      (
        email, 
        password
        )
      .then(() => {
        setisRegister(true);
        setisInfoTooltipOpen(true);
        setnoticeMassage({image: auth_success, text: "Вы успешно зарегистрировались!"});
        navigate('/signin');
        })
      .catch(() => {
        setnoticeMassage({image: auth_error, text: "Что-то пошло не так! Попробуйте ещё раз."});
        setisInfoTooltipOpen(true) });
    }
  }

  function outLogged () {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    
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
                    userEmail={userEmail}
                    setLoggedIn={setLoggedIn}
                    onSignOut={outLogged}
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
                    // setisRegister={setisRegister}
                    // setisInfoTooltipOpen={setisInfoTooltipOpen}
                    onRegister={handleRegister}
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
                    handleLoginSet={handleLoginSet}
                    onLogin={handleLogin}
                    loggedIn={loggedIn}
                    // setisRegister={setisRegister}
                    // setisInfoTooltipOpen={setisInfoTooltipOpen}
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
            noticeMassage={noticeMassage}
          />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
