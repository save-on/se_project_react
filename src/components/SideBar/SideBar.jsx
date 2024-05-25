// Imports
import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Component
function SideBar({ onEditProfileClick, onSignOutClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  // JSX
  return (
    <aside className="sidebar">
      <div className="sidebar__container">
        <img
          src={currentUser.avatar}
          alt="default avatar"
          className="sidebar__picture"
        />
        <p className="sidebar__name">{currentUser.name}</p>
      </div>
      <button className="sidebar__edit-profile" onClick={onEditProfileClick}>
        Change profile data
      </button>
      <button className="sidebar__signout" onClick={onSignOutClick}>
        Log out
      </button>
    </aside>
  );
}

export default SideBar;
