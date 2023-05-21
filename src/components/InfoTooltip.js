function InfoTooltip(props) {
  return (
    <>
      <section
        className={`popup popup_type_infoTooltip ${
          props.isOpen ? "popup_opened" : ""
        }`}
      >
        <div className="popup__container">
          <button
            type="button"
            onClick={props.onClose}
            aria-label="закрыть"
            className="popup__closed"
          />
          <img
            className="popup__auth-view"
            src={props.noticeMassage.image}
            alt={props.noticeMassage.text}
          />
          <h2 className="popup__auth-title">
            {props.noticeMassage.text}
          </h2>
        </div>
      </section>
    </>
  );
}

export default InfoTooltip;
