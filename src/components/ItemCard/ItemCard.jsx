// Imports
import "./ItemCard.css";

// Component
function ItemCard({ item, onCardClick }) {
  
  // Handles
  const handleCardClick = () => {
    onCardClick(item)
  }

  // JSX
  return (
    <li className="item-card__card" key={item._id}>
      <img
        className="item-card__card-image"
        onClick={handleCardClick}
        src={item.link}
        alt={item.name}
      />
      <p className="item-card__card-text">{item.name}</p>
    </li>
  );
}

export default ItemCard;
