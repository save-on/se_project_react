import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, handleCardClick}) {
  return (
    <main className="content">
      <WeatherCard weatherData={weatherData}/>
      <section className="cards">
        <p className="cards__suggestion">
          Today is {`${weatherData.temp.F}`} / You may want to wear:
        </p>
        <div className="cards__container">
          <ul className="cards__list">
            {defaultClothingItems.filter((item) => {
              return item.weather === weatherData.type;
            }).map((item) => {
              return <ItemCard key={item._id} item={item} onCardClick={handleCardClick}/>;
              // gotta make sure ad in data for handleCardClick to take back with it
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Main;
