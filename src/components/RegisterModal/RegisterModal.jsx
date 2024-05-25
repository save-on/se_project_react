import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  handleRegistration,
  onSignInClick,
  onCloseClick,
  activePopup,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetInputs = () => {
    setData({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
    // resetInputs();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={activePopup === "sign-up"}
      onSubmit={handleSubmit}
      onCloseClick={onCloseClick}
    >
      <label htmlFor="register-email" className="popup__input-title">
        Email *
        <input
          type="register-email"
          id="register-email"
          name="email"
          className="popup__input popup__input_type_register-email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="popup__input-title">
        Password *
        <input
          type="register-password"
          id="register-password"
          name="password"
          className="popup__input popup__input_type_register-password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-name" className="popup__input-title">
        Name *
        <input
          type="register-name"
          id="register-name"
          name="name"
          className="popup__input popup__input_type_register-name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-avatar" className="popup__input-title">
        Avatar URL *
        <input
          type="register-avatar"
          id="register-avatar"
          name="avatar"
          className="popup__input popup__input_type_register-avatar"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleChange}
          required
        />
      </label>
      <div className="popup__signup">
        <p className="popup__signup-text">or</p>
        <button className="popup__btn" onClick={onSignInClick}>
          Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
