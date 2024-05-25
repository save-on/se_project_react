// Imports
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

// Component
const EditProfileModal = ({ handleEditProfile, onCloseClick, activePopup }) => {
  // Hooks
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  // Handles
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResetInputs = () => {
    setData({
      name: "",
      avatar: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(data);
    handleResetInputs;
  };

  // JSX
  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={activePopup === "edit-profile"}
      onCloseClick={onCloseClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-name" className="popup__input-title">
        Name *
        <input
          type="edit-name"
          id="edit-name"
          className="popup__input popup__input_type_edit-name"
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="edit-avatar" className="popup__input-title">
        Avatar *
        <input
          type="edit-avatar"
          id="edit-avatar"
          className="popup__input popup__input_type_edit-avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={data.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
