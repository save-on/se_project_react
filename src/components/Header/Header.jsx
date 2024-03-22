import "../Header/Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ onAddClick, weatherData }) {
  
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="wtwr logo" />
      <p className="header__info-details">{currentDate}, {weatherData.city}</p>
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
