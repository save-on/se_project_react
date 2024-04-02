// Imports
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

// Component
function ClothesSection({ handleCardClick, clothingItems }) {
  // JSX
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__text">Your items</p>
        <button type="button" className="clothes-section__add-btn">
          + Add new
        </button>
      </div>
      <div className="clothes-section__container">
        <ul className="clothes-section__list">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          }).reverse()}
        </ul>
      </div>
    </section>
  );
}

export default ClothesSection;
