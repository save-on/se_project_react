import "./ItemCard.css";
import shirt from "../../assets/shirt.png"
import shorts from "../../assets/shorts.png"
import hat from "../../assets/hat.png"
import shoes from "../../assets/shoes.png"

function ItemCard() {
  return (
    <section className="item-card">
      <p className="item-card__suggestion">Today is 75° F / You may want to wear:</p>
      <div className="item-card__container">
        <ul className="item-card__list">
          <li className="item-card__card">
            <img src={shirt} alt="shirt item" className="item-card__card-image" />
            <p className="item-card__card-text">T-Shirt</p>
          </li>
          <li className="item-card__card">
            <img src={shorts} alt="shorts item" className="item-card__card-image" />
            <p className="item-card__card-text">Shorts</p>
          </li>
          <li className="item-card__card">
            <img src={hat} alt="hat item" className="item-card__card-image" />
            <p className="item-card__card-text">hat</p>
          </li>
          <li className="item-card__card">
            <img src={shoes} alt="shoes item" className="item-card__card-image" />
            <p className="item-card__card-text">Shoes</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default ItemCard;
