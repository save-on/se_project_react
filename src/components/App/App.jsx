// Imports
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey, baseUrl } from "../../utils/constants";
import { getClothing, addClothing, deleteClothing } from "../../utils/api";
import { signIn, signUp } from "../../utils/auth";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AppContext from "../../contexts/AppContext";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    avatar: "",
    name: "",
  });

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
    getClothing(baseUrl)
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  // handles
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closePopup();
      })
      .catch(console.error);
  };

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

  const handleRegistration = (data) => {
    signUp(baseUrl, data)
      .then(() => {
        setUserData(data);
        // close the popup
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
          <AppContext.Provider value={isLoggedIn}>
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
                  <ProtectedRoute>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AppContext.Provider>
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
        <RegisterModal
          handleRegistration={handleRegistration}
          onCloseClick={closePopup}
        />
        <LoginModal />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
