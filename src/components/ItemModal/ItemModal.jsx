// Imports
import "../../index.css";

// Components
function ItemModal({ card, onCloseClick, title, isOpen, handleDelete }) {
  // Handles
  const handleOnClick = (e) => {
    if (e.target.classList.contains("popup")) {
      onCloseClick();
    }
  };

  // JSX
  return (
    <div
      className={`popup popup_type_${title} ${isOpen && "popup_opened"}`}
      onMouseDown={handleOnClick}
    >
      <div className="popup__container popup__container_type_image">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="close button"
          onClick={onCloseClick}
        />
        <img
          src={card.imageUrl}
          alt={card.name}
          className="popup__item-image"
        />
        <div className="popup__item-info">
          <p className="popup__item-caption">{card.name}</p>
          <p className="popup__item_temp-info">Weather: {card.weather}</p>
        </div>
        <button
          onClick={ ()=> {
            handleDelete(card)
          }}
          type="button"
          className="popup__item-delete"
        >
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
