// Imports
import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";
import { useForm } from "../../hooks/useForm";

// Component
const EditProfileModal = ({
  handleEditProfile,
  onCloseClick,
  activePopup,
  isLoading,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  // Hook
  const { values, handleChanges, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  // Handles;
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(values);
  };

  // JSX
  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save Changes"}
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
          value={values.name}
          onChange={handleChanges}
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
          value={values.avatar}
          onChange={handleChanges}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
