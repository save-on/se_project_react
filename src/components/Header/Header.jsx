// Imports
import { Link } from "react-router-dom";
import { useContext } from "react";

import "../Header/Header.css";
import "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Current date
const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

// Component
function Header({ onAddClick, onSignInClick, onSignUpClick, weatherData }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  // JSX
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="wtwr logo" />
      </Link>
      <p className="header__info-details">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {!isLoggedIn ? (
        <div className="header__access-container">
          <button className="header__signup" onClick={onSignUpClick}>
            Sign Up
          </button>
          <button className="header__signin" onClick={onSignInClick}>
            Log In
          </button>
        </div>
      ) : (
        <>
          <button className="header__add-clothes-btn" onClick={onAddClick}>
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-information">
              <p className="header__user-name">{currentUser.name}</p>
              <img
                className="header__user-avatar"
                src={currentUser.avatar}
                alt="user avatar"
              />
            </div>
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
