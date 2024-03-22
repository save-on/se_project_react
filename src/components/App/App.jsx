import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activePopup, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    activePopup !== ""
      ? document.addEventListener("keydown", handleEscClick)
      : document.removeEventListener("keydown", handleEscClick);
  });

  const handleEscClick = (e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-clothes");
  };

  const closePopup = () => {
    setActiveModal("");
  };

  return (
    <div className="app">
      <div className="app__content">
        <Header onAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add Garment"
        title="New Garment"
        activePopup={activePopup}
        onCloseClick={closePopup}
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
            <input className="popup__radio" type="radio" id="hot" />
            Hot
          </label>
          <label className="popup__radio-container" htmlFor="warm">
            <input className="popup__radio" type="radio" id="warm" />
            Warm
          </label>
          <label className="popup__radio-container" htmlFor="cold">
            <input className="popup__radio" type="radio" id="cold" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activePopup={activePopup}
        card={selectedCard}
        onCloseClick={closePopup}
        title="Item Popup"
      />
    </div>
  );
}

export default App;
