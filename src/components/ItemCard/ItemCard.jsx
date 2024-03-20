import "./ItemCard.css";

function ItemCard({item}) {
  return (
    <li className="item-card__card" key={item._id}>
      <img className="item-card__card-image" src={item.link} alt={item.name} />
      <p className="item-card__card-text">{item.name}</p>
    </li>
  );
}

export default ItemCard;
