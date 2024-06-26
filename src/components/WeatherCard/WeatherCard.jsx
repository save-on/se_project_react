// Imports
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// Component
function WeatherCard({ weatherData }) {
  // Hooks
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Functions
  const filteredOption = weatherOptions.find((option) => {
    return (
      weatherData.condition === option.condition &&
      weatherData.isDay === option.day
    );
  });

  let weatherOption;

  filteredOption === undefined
    ? (weatherOption =
        defaultWeatherOptions[weatherData.isDay ? "day" : "night"])
    : (weatherOption = filteredOption);

  // JSX
  return (
    <section className="weather-card">
      <img
        className="weather-card__image"
        src={weatherOption?.url}
        alt={weatherOption?.condition}
      />
      <h1 className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp[currentTemperatureUnit]
          : weatherData.temp[currentTemperatureUnit]}
      </h1>
    </section>
  );
}

export default WeatherCard;
