// Imports
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";
import { useContext } from "react";

// Component
function ToggleSwitch() {
  // Hooks
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  // JSX
  return (
    <>
      <input
        type="checkbox"
        id="temp-switch"
        className="temp-switch"
        onClick={handleToggleSwitchChange}
      />
      <label htmlFor="temp-switch" className="temp-switch__background">
        <div
          className={
            currentTemperatureUnit === "F"
              ? "temp-switch__slider temp-switch__slider_F"
              : "temp-switch__slider temp-switch__slider_C"
          }
        ></div>
        <p
          className={`temp-switch__option ${
            currentTemperatureUnit === "F" && "temp-switch__option_active"
          }`}
        >
          F
        </p>
        <p
          className={`temp-switch__option ${
            currentTemperatureUnit === "C" && "temp-switch__option_active"
          }`}
        >
          C
        </p>
      </label>
    </>
  );
}

export default ToggleSwitch;
