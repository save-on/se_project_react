// Import
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

// Component
function Profile() {

  // JSX
  return (
    <main className="profile-content">
      <SideBar />
      <ClothesSection />
    </main>
  )
}

export default Profile;