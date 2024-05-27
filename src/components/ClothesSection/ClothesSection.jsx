// Imports
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ClothingItemsContext from "../../contexts/ClothingItemsContext";

// Component
function ClothesSection({ handleCardClick, onAddClick, handleCardLike }) {
  // Hooks
  const { currentUser } = useContext(CurrentUserContext);
  const { clothingItems } = useContext(ClothingItemsContext);
  // JSX
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__text">Your items</p>
        <button
          type="button"
          className="clothes-section__add-btn"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>
      <div className="clothes-section__container">
        <ul className="clothes-section__list">
          {clothingItems.map((item) => {
            if (item.owner !== currentUser._id) {
              return;
            }
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
  );
}

export default ClothesSection;
