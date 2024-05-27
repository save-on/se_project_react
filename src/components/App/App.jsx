// Imports
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

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
import { coordinates, APIkey } from "../../utils/constants";
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
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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
    getClothing()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = handleTokenCheck();
    if (jwt) {
      getUserInfo(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          const redirectPath = location.state?.from?.pathname;
          navigate(redirectPath);
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
    setIsLoading(true);
    addClothing(item, jwt)
      .then((res) => {
        setClothingItems([res.data, ...clothingItems]);
        closePopup();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (card) => {
    const jwt = handleTokenCheck();
    setIsLoading(true);
    deleteClothing(card._id, jwt)
      .then(() => {
        const newClothingItems = clothingItems.filter(
          (item) => item._id !== card._id
        );
        setClothingItems(newClothingItems);
        closePopup();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleRegistration = (data) => {
    setIsLoading(true);
    signUp(data)
      .then(() => {
        signIn(data)
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
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleLogin = (data) => {
    setIsLoading(true);
    signIn(data)
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
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleSignOut = () => {
    const jwt = handleTokenCheck();
    removeToken(jwt);
    setIsLoggedIn(false);
  };

  const handleEditProfile = (data) => {
    const jwt = handleTokenCheck();
    setIsLoading(true);
    editUserInfo(data, jwt)
      .then(({ name, avatar, _id }) => {
        setCurrentUser({
          name,
          avatar,
          _id,
        });
        closePopup();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ _id }, isLiked) => {
    const jwt = handleTokenCheck();
    !isLiked
      ? addCardLike(_id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch(console.error)
      : removeCardLike(_id, jwt)
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
            isLoading={isLoading}
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
            isLoading={isLoading}
          />
          <RegisterModal
            handleRegistration={handleRegistration}
            onSignInClick={handleSignInClick}
            onCloseClick={closePopup}
            activePopup={activePopup}
            isLoading={isLoading}
          />
          <LoginModal
            handleLogin={handleLogin}
            onSignUpClick={handleSignUpClick}
            onCloseClick={closePopup}
            activePopup={activePopup}
            isLoading={isLoading}
          />
          <EditProfileModal
            handleEditProfile={handleEditProfile}
            onCloseClick={closePopup}
            activePopup={activePopup}
            isLoading={isLoading}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;

/*
  Todo
    - You left off on the reset portion of the review
    - Figure out how to get useForm to work
*/
