// Import
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

// Component
function Profile({
  handleCardClick,
  handleAddClick,
  handleEditProfileClick,
  handleSignOut,
  handleCardLike,
}) {
  // JSX
  return (
    <main className="profile-content">
      <SideBar
        onEditProfileClick={handleEditProfileClick}
        onSignOutClick={handleSignOut}
      />
      <ClothesSection
        handleCardClick={handleCardClick}
        onAddClick={handleAddClick}
        handleCardLike={handleCardLike}
      />
    </main>
  );
}

export default Profile;
