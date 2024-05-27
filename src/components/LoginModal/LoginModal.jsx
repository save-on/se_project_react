import { useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { signIn } from "../../utils/auth";
import { setToken } from "../../utils/token";

const LoginModal = ({
  handleSubmit,
  onSignUpClick,
  onCloseClick,
  activePopup,
  isLoading,
}) => {
  const { setIsLoggedIn, setCurrentUser } = useContext(CurrentUserContext);
  const { values, handleChanges, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleInputReset = () => {
    setValues({
      email: "",
      password: "",
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const makeRequest = () => {
      return signIn(values).then(({ token, name, avatar, _id }) => {
        if (token) {
          setToken(token);
          setIsLoggedIn(true);
          setCurrentUser({
            name,
            avatar,
            _id,
          });
          handleInputReset();
        }
      });
    };
    handleSubmit(makeRequest);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText={isLoading ? "Logging in..." : "Log in"}
      isOpen={activePopup === "sign-in"}
      onCloseClick={onCloseClick}
      onSubmit={handleSignIn}
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
