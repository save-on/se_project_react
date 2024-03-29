// Imports
import "../Header/Header.css";
import "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

// Current date
const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

// Component
function Header({ onAddClick, weatherData }) {
  
  // JSX
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="wtwr logo" />
      <p className="header__info-details">{currentDate}, {weatherData.city}</p>
      <ToggleSwitch />
      <button className="header__add-clothes-btn" onClick={onAddClick}>
        + Add Clothes
      </button>
      <div className="header__user-information">
        <p className="header__user-name">Terrence Tegegne</p>
        <img className="header__user-avatar" src={avatar} alt="user avatar" />
      </div>
    </header>
  );
}

export default Header;
