import "./ModalWithForm.css";

function ModalWithForm({children, title, buttonText, activePopup, handleCloseClick}) {
  return (
    <div className= {`popup ${activePopup === 'add-clothes' && "popup-opened"}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="close button"
          onClick={handleCloseClick}
        ></button>
        {/* don't forget to add noValidate to the form */}
        <form className="popup__form" name="clothes-form">
          {children}
          <button type="submit" className="popup__submit-btn">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
