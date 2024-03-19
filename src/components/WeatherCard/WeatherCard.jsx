import "./WeatherCard.css";
import clearDay from "../../assets/clear-day.png"


function WeatherCard() { 
  return (
    <section className="weather-card">
      <img className="weather-card__image" src={clearDay} alt="clear day weather card" />
      <h1 className="weather-card__temp">75°F</h1>
    </section>
  );
}

export default WeatherCard;
