import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({
  handleLogin,
  onSignUpClick,
  onCloseClick,
  activePopup,
  isLoading,
}) => {
  const { values, handleChanges } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText={isLoading ? "Logging in..." : "Log in"}
      isOpen={activePopup === "sign-in"}
      onCloseClick={onCloseClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="popup__input-title">
        Email
        <input
          type="login-email"
          id="login-email"
          className="popup__input popup__input_type_login-email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChanges}
          required
        />
      </label>
      <label htmlFor="login-password" className="popup__input-title">
        Password
        <input
          type="login-password"
          id="login-password"
          className="popup__input popup__input_type_login-password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChanges}
          required
        />
      </label>
      <div className="popup__signup">
        <p className="popup__signup-text">or</p>
        <button className="popup__btn" type="button" onClick={onSignUpClick}>
          Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
