import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      weatherData.condition === option.condition &&
      weatherData.isDay === option.day
    );
  });

  let weatherOption;

  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <img
        className="weather-card__image"
        src={weatherOption?.url}
        alt={weatherOption?.condition}
      />
      <h1 className="weather-card__temp">{`${weatherData.temp.F}`}</h1>
    </section>
  );
}

export default WeatherCard;
