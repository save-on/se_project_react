// Import
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

// Component
function Profile({ handleCardClick }) {

  // JSX
  return (
    <main className="profile-content">
      <SideBar />
      <ClothesSection handleCardClick={handleCardClick}/>
    </main>
  )
}

export default Profile;