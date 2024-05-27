// Imports
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

// Component
function AddItemModal({ closePopup, activePopup, onAddItem }) {
  // Hooks
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  // Functions
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
    resetInputs();
  };

  const resetInputs = () => {
    setName("");
    setImageUrl("");
    setWeather("");
  };

  // JSX
  return (
    <ModalWithForm
      buttonText="Add Garment"
      title="New Garment"
      onCloseClick={closePopup}
      isOpen={activePopup === "add-clothes"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="add-clothes" className="popup__input-title">
        Name
        <input
          type="text"
          id="add-clothes"
          className="popup__input popup__input_type_add-clothes"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
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
          value={imageUrl}
          onChange={handleImageUrlChange}
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
            id="hot"
            type="radio"
            value="hot"
            checked={weather === "hot"}
            name="weather-type"
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label className="popup__radio-container" htmlFor="warm">
          <input
            className="popup__radio"
            id="warm"
            type="radio"
            value="warm"
            checked={weather === "warm"}
            name="weather-type"
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label className="popup__radio-container" htmlFor="cold">
          <input
            className="popup__radio"
            id="cold"
            type="radio"
            value="cold"
            checked={weather === "cold"}
            name="weather-type"
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
