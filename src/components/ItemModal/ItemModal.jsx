import "./ItemModal.css";

function ItemModal({ activePopup, card, onCloseClick }) {

  const handleOffPopupClose = (e) => {
    if (e.target && document.querySelector('.popup')) {
      onCloseClick()
    }
    console.log(e.target)
  }

  const handleEscClose = (e) => {
    if (e.key !== "Escape") {
      onCloseClick()
    }
  }

  return (
    <div className={`popup ${activePopup === "preview" && "popup-opened"}`} onMouseDown={handleOffPopupClose}>
      <div className="popup__container popup__container_type_image" >
        <button
          className="popup__close-btn"
          type="button"
          aria-label="close button"
          onClick={onCloseClick}
        ></button>
        <img src={card.link} alt={card.name} className="popup__item-image" />
        <div className="popup__item-info">
          <p className="popup__item-caption">{card.name}</p>
          <p className="popup__temp-info">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
