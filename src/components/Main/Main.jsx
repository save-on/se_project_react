// Imports
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ClothingItemsContext from "../../contexts/ClothingItemsContext";

// Component
function Main({ weatherData, handleCardClick, handleCardLike }) {
  // Hooks
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { clothingItems } = useContext(ClothingItemsContext);

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
                    onCardLike={handleCardLike}
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
