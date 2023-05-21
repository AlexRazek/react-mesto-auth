function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : " "
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          onClick={props.onClose}
          aria-label="закрыть"
          className="popup__closed"
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={`form-${props.type}`}
          className="popup__input"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            id="btn-update_card"
            disabled={false}
            aria-label="действия"
            className="popup__submit-btn"
          >
            {props.buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
