// Imports
import "./ItemCard.css";
import unLiked from "../../assets/State=Default.png";
import liked from "../../assets/State=Liked.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Component
function ItemCard({ item, onCardClick, onCardLike }) {
  // Hooks
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  // Constants
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const likeBtnClassName = `item-card__like-btn ${
    isLoggedIn ? "item-card__like-btn_visible" : "item-card__like-btn_hidden"
  }`;

  // Handles
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleCardLike = () => {
    onCardLike(item, isLiked);
  };

  // JSX
  return (
    <li className="item-card__card">
      <img
        className="item-card__card-image"
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="item-card__title-container">
        <p className="item-card__card-text">{item.name}</p>
        <img
          src={isLiked ? liked : unLiked}
          alt="like button"
          className={likeBtnClassName}
          onClick={handleCardLike}
        />
      </div>
    </li>
  );
}

export default ItemCard;
