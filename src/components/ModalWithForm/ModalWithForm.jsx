// Imports
import "../../index.css";

// Component
function ModalWithForm({
  children,
  title,
  buttonText,
  onCloseClick,
  isOpen,
  onSubmit,
}) {
  const handleOnClick = (e) => {
    if (e.target.classList.contains("popup")) {
      onCloseClick();
    }
  };

  return (
    <div
      className={`popup popup_type_${title} ${isOpen && "popup_opened"}`}
      onMouseDown={handleOnClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
          className="popup__close-btn popup__close-btn_dark"
          type="button"
          aria-label="close button"
          onClick={onCloseClick}
        />
        {/* don't forget to add noValidate to the form */}
        <form className="popup__form" name={title} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
