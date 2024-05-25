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
import {
  addCardLike,
  editUserInfo,
  getUserInfo,
  removeCardLike,
  signIn,
  signUp,
} from "../../utils/auth";
import { getToken, removeToken, setToken } from "../../utils/token";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
  const [currentUser, setCurrentUser] = useState({
    avatar: "",
    name: "",
    _id: "",
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

  useEffect(() => {
    const jwt = handleTokenCheck();
    if (jwt) {
      getUserInfo(baseUrl, jwt)
        .then(({ name, avatar, _id }) => {
          setIsLoggedIn(true);
          setCurrentUser({
            name,
            avatar,
            _id,
          });
        })
        .catch(console.error);
    }
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

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleSignInClick = () => {
    setActiveModal("sign-in");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closePopup = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = (item) => {
    const jwt = handleTokenCheck();
    addClothing(baseUrl, item, jwt)
      .then((res) => {
        setClothingItems([res.data, ...clothingItems]);
        closePopup();
      })
      .catch(console.error);
  };

  const handleDelete = (card) => {
    const jwt = handleTokenCheck();
    deleteClothing(baseUrl, card._id, jwt)
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
        signIn(baseUrl, data)
          .then(({ token, name, avatar, _id }) => {
            if (token) {
              setToken(token);
              setCurrentUser({
                name,
                avatar,
                _id,
              });
              setIsLoggedIn(true);
              closePopup();
            }
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  const handleLogin = (data) => {
    signIn(baseUrl, data)
      .then(({ token, name, avatar, _id }) => {
        if (token) {
          setToken(token);
          setIsLoggedIn(true);
          setCurrentUser({
            name,
            avatar,
            _id,
          });
          closePopup();
        }
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    const jwt = handleTokenCheck();
    removeToken(jwt);
    setIsLoggedIn(false);
  };

  const handleEditProfile = (data) => {
    const jwt = handleTokenCheck();
    editUserInfo(baseUrl, data, jwt)
      .then(({ name, avatar, _id }) => {
        setCurrentUser({
          name,
          avatar,
          _id,
        });
        closePopup();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ _id }, isLiked) => {
    const jwt = handleTokenCheck();
    !isLiked
      ? addCardLike(baseUrl, _id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch(console.error)
      : removeCardLike(baseUrl, _id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  const handleTokenCheck = () => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    return jwt;
  };

  // JSX
  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={{ isLoggedIn, currentUser }}>
          <div className="app__content">
            <Header
              onAddClick={handleAddClick}
              onSignInClick={handleSignInClick}
              onSignUpClick={handleSignUpClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
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
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleSignOut={handleSignOut}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
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
          <RegisterModal
            handleRegistration={handleRegistration}
            onSignInClick={handleSignInClick}
            onCloseClick={closePopup}
            activePopup={activePopup}
          />
          <LoginModal
            handleLogin={handleLogin}
            onSignUpClick={handleSignUpClick}
            onCloseClick={closePopup}
            activePopup={activePopup}
          />
          <EditProfileModal
            handleEditProfile={handleEditProfile}
            onCloseClick={closePopup}
            activePopup={activePopup}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;

// Todo
/*
  - Add so that the location they left on is the location they come back 
  to after a page refresh
 */
