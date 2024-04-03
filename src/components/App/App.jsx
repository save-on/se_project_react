// Imports
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey, baseUrl } from "../../utils/constants";
import { getClothing, addClothing, deleteClothing } from "../../utils/api";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// Component
function App() {
  // Hooks
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activePopup, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activePopup) return;

    const handleEscClick = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscClick);

    return () => {
      document.removeEventListener("keydown", handleEscClick);
    };
  }, [activePopup]);

  useEffect(() => {
    getClothing(baseUrl).then((data) => {
      setClothingItems(data.reverse());
    });
  }, []);

  // handles
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  // todo When you add on a new item it appears at the bottom and you can't delete it

  const handleAddClick = () => {
    setActiveModal("add-clothes");
  };

  const handleConfirmationClick = () => {
    setActiveModal("confirmation");
  };

  const closePopup = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = (item) => {
    addClothing(baseUrl, item)
      .then(() => {
        setClothingItems([item, ...clothingItems]);
        closePopup();
      })
      .catch(console.error);
  };

  console.log(clothingItems)

  const handleDelete = (card) => {
    deleteClothing(baseUrl, card._id)
      .then(() => {
        const newClothingItems = clothingItems.filter(
          (item) => item._id !== card._id
        );
        setClothingItems(newClothingItems);
        closePopup();
      })
      .catch(console.error);
  };

  // JSX
  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app__content">
          <Header onAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          closePopup={closePopup}
          activePopup={activePopup}
          onAddItem={handleAddItemSubmit}
        />
        <ItemModal
          card={selectedCard}
          onCloseClick={closePopup}
          title="image"
          isOpen={activePopup === "preview"}
          handleConfirmationClick={handleConfirmationClick}
        />
        <DeleteConfirmationModal
          card={selectedCard}
          isOpen={activePopup === "confirmation"}
          title="confirmation"
          onCloseClick={closePopup}
          onDelete={handleDelete}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
