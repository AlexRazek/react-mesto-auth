function ImagePopup(props) {
  return (
    <>
      <section
        className={`popup popup_type_picture ${
          props.card.isOpenImage ? "popup_opened" : ""
        }`}
        id="popup-image"
      >
        {/* <section className= 'popup popup_type_picture' id="popup-image"> */}
        <div className="popup__image-container">
          <button
            type="button"
            onClick={props.onClose}
            aria-label="закрыть"
            className="popup__closed"
          />
          <img
            className="popup__image-view"
            src={props.card.link}
            alt={props.card.name}
          />
          <h2 className="popup__image-title">{props.card.name}</h2>
        </div>
      </section>
    </>
  );
}

export default ImagePopup;
