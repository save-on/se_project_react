import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard"

function Main() {
  return (
    <main className="content">
      <WeatherCard />
      <ItemCard />
    </main>
  )
}

export default Main;