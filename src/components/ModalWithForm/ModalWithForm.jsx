import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  onCloseClick,
  isOpen
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
          className="popup__close-btn"
          type="button"
          aria-label="close button"
          onClick={onCloseClick}
        />
        {/* don't forget to add noValidate to the form */}
        <form className="popup__form" name={title}>
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
