// Import
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

// Component
function Profile({ handleCardClick, clothingItems }) {

  // JSX
  return (
    <main className="profile-content">
      <SideBar />
      <ClothesSection handleCardClick={handleCardClick} clothingItems={clothingItems}/>
    </main>
  )
}

export default Profile;