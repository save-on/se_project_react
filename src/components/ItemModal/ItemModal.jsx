import "./ItemModal.css";

function ItemModal({ card, onCloseClick, title, isOpen }) {
  const handleOnClick = (e) => {
    if (e.target.classList.contains("popup")) {
      onCloseClick();
    }
  };

  return (
    <div
      className={`popup popup_type_${title} ${
        isOpen("preview") && "popup_opened"
      }`}
      onMouseDown={handleOnClick}
    >
      <div className="popup__container popup__container_type_image">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="close button"
          onClick={onCloseClick}
        />
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
