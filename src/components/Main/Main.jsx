// Imports
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// Component
function Main({ weatherData, handleCardClick, clothingItems }) {
  // Hooks
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // JSX
  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__suggestion">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp[currentTemperatureUnit]
            : weatherData.temp[currentTemperatureUnit]}
          / You may want to wear:
        </p>
        <div className="cards__container">
          <ul className="cards__list">
            {clothingItems
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                    // key={} // add unique value as a key
                  />
                );
              })}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Main;
