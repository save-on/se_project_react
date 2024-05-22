import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = () => {
  return (
    <ModalWithForm title="Log In" buttonText="Log In" isOpen={false}>
      <label htmlFor="login-email" className="popup__input-title">
        Email
        <input
          type="login-email"
          id="login-email"
          className="popup__input popup__input_type_login-email"
          placeholder="Email"
          // value=""
          // onChange={}
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
          // value=""
          // onChange={}
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
