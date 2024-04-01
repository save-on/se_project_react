// Imports
import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

// Component
function SideBar() {
  // JSX
  return (
    <aside className="sidebar">
      <div className="sidebar__container">
        <img src={avatar} alt="default avatar" className="sidebar__picture" />
        <p className="sidebar__name">Terrence Tegegne</p>
      </div>
    </aside>
  );
}

export default SideBar;
