import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData }) {
  return (
    <main className="content">
      <WeatherCard />
      <section className="cards">
        <p className="cards__suggestion">
          Today is 75° F / You may want to wear:
        </p>
        <div className="cards__container">
          <ul className="cards__list">
            {defaultClothingItems.filter((item) => {
              return item.weather === weatherData.type;
            }).map((item) => {
              return <ItemCard key={item._id} item={item} />;
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Main;
