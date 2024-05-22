import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ handleLogin, onCloseClick }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
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
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
    // resetInputs();
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={false}
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
          value={data.email}
          onChange={handleChange}
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
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
      <div className="popup__signup">
        <p className="popup__signup-text">or</p>
        <button className="popup__btn">Sign Up</button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
