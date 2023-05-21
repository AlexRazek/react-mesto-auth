import auth_error from "../images/auth_error.svg";
import auth_success from "../images/auth_success.svg";

function InfoTooltip(props) {
  const noticeMassage = {
    true: {
      image: auth_success,
      text: "Вы успешно зарегистрировались!",
      altText: "Успешная регистрация",
    },
    false: {
      image: auth_error,
      text: "Что-то пошло не так! Попробуйте ещё раз.",
      altText: "Ошибка во время регистрации",
    },
  };

  return (
    <>
      <section
        className={`popup popup_type_infoTooltip ${
          props.isOpen ? "popup_opened" : ""
        }`}
      >
        {/* <section className= 'popup popup_type_picture' id="popup-image"> */}
        <div className="popup__container">
          <button
            type="button"
            onClick={props.onClose}
            aria-label="закрыть"
            className="popup__closed"
          />
          <img
            className="popup__auth-view"
            src={noticeMassage[props.register].image}
            alt={noticeMassage[props.register].altText}
          />
          {/* <h2 className="popup__auth-title">Вы успешно зарегистрировались!</h2> */}
          <h2 className="popup__auth-title">
            {noticeMassage[props.register].text}
          </h2>
        </div>
      </section>
    </>
  );
}

export default InfoTooltip;
