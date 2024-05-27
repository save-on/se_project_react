import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useForm } from "../../hooks/useForm";
import { handleTokenCheck, setToken } from "../../utils/token";
import { signIn, signUp } from "../../utils/auth";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const RegisterModal = ({
  handleSubmit,
  onSignInClick,
  onCloseClick,
  activePopup,
  isLoading,
}) => {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const { values, handleChanges, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleInputReset = () => {
    setValues({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const makeRequest = () => {
      return signUp(values).then(() => {
        signIn(values)
          .then(({ token, name, avatar, _id }) => {
            if (token) {
              setToken(token);
              setCurrentUser({
                name,
                avatar,
                _id,
              });
              setIsLoggedIn(true);
              handleInputReset();
            }
          })
          .catch(console.error);
      });
    };
    handleSubmit(makeRequest);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isLoading ? "Signing up..." : "Sign up"}
      isOpen={activePopup === "sign-up"}
      onSubmit={handleSignUp}
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
          value={values.email}
          onChange={handleChanges}
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
          value={values.password}
          onChange={handleChanges}
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
          value={values.name}
          onChange={handleChanges}
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
          value={values.avatar}
          onChange={handleChanges}
          required
        />
      </label>
      <div className="popup__signup">
        <p className="popup__signup-text">or</p>
        <button className="popup__btn" type="button" onClick={onSignInClick}>
          Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
