// Imports
import ModalWithForm from "../ModalWithForm/ModalWithForm"
import "./AddItemModal.css";

// Component
function AddItemModal({closePopup, activePopup}) {
  
  // JSX
  return (
    <ModalWithForm
    buttonText="Add Garment"
    title="New Garment"
    onCloseClick={closePopup}
    isOpen={activePopup === "add-clothes"}
  >
    <label htmlFor="add-clothes" className="popup__input-title">
      Name
      <input
        type="text"
        id="add-clothes"
        className="popup__input popup__input_type_add-clothes"
        placeholder="Name"
        minLength="1"
        maxLength="30"
        required
      />
    </label>
    <label htmlFor="imageUrl" className="popup__input-title">
      Image
      <input
        type="url"
        id="imageUrl"
        className="popup__input popup__input_type_clothes-link"
        placeholder="Image Url"
        required
      />
    </label>
    <fieldset className="popup__radios">
      <legend className="popup__weather-type">
        Select the weather type:
      </legend>
      <label className="popup__radio-container" htmlFor="hot">
        <input
          className="popup__radio"
          type="radio"
          id="hot"
          name="weather-type"
        />
        Hot
      </label>
      <label className="popup__radio-container" htmlFor="warm">
        <input
          className="popup__radio"
          type="radio"
          id="warm"
          name="weather-type"
        />
        Warm
      </label>
      <label className="popup__radio-container" htmlFor="cold">
        <input
          className="popup__radio"
          type="radio"
          id="cold"
          name="weather-type"
        />
        Cold
      </label>
    </fieldset>
  </ModalWithForm>
  );
}

export default AddItemModal;