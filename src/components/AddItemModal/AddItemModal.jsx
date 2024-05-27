// Imports
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
import { useForm } from "../../hooks/useForm";

// Component
function AddItemModal({ closePopup, activePopup, onAddItem, isLoading }) {
  // Hooks
  const { values, handleChanges } = useForm({
    imageUrl: "",
    weather: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  // JSX
  return (
    <ModalWithForm
      buttonText={isLoading ? "Adding..." : "Add garment"}
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
          name="name"
          value={values.name}
          onChange={handleChanges}
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
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChanges}
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
            checked={values.weather === "hot"}
            name="weather"
            onChange={handleChanges}
          />
          Hot
        </label>
        <label className="popup__radio-container" htmlFor="warm">
          <input
            className="popup__radio"
            id="warm"
            type="radio"
            value="warm"
            checked={values.weather === "warm"}
            name="weather"
            onChange={handleChanges}
          />
          Warm
        </label>
        <label className="popup__radio-container" htmlFor="cold">
          <input
            className="popup__radio"
            id="cold"
            type="radio"
            value="cold"
            checked={values.weather === "cold"}
            name="weather"
            onChange={handleChanges}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
