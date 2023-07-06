import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";

// import styles and images
import "./formPage.css";
import google from "../../img/google.png";
import LanguageOption from "../LanguageOption";
import { LanguageContext } from "../../context/LanguageContext";
import translate from "./formPage.json";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, login, setError } = useLogin();
  const { dispatch } = useAuthContext();
  const { language } = useContext(LanguageContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const signInWithGoogle = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form">
      <div className="form-group">
        <div className="text-left d-flex w-100">
          <div className="d-flex w-50">
          <p className="login">{props.name}</p>
          </div>
          <LanguageOption />
        </div>
        <div className="google-btn">
          <button onClick={signInWithGoogle}>
            <div className="logo-container">
              <img src={google} alt="google_logo" className="logo" />
            </div>
            <div className="login-content">
              <span> {props.name} {translate.usingGoogle[language]}</span>
            </div>
          </button>
        </div>
        <div className="email-container">
          <input
            type="email"
            name="email"
            placeholder="email *"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <input
          type="password"
          name="password"
          placeholder={translate.password[language]}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="email-container">
          <button type="button" className="btn btn-dark button" onClick={handleSubmit}>
            {translate.login[language]}
          </button>
        </div>
        {error && error === "Firebase: Error (auth/invalid-email)." && <span style={{ color: "red" }}>Zły email</span>}
        {error && error === "Firebase: Error (auth/wrong-password)." && <span style={{ color: "red" }}>Złe hasło</span>}
        <div className="text-left register-container">{props.footer}</div>
        <div className="text-left register-container ml-5 mt-0">
          {translate.forgotPassword[language]}{" "}
          <Link style={{ color: "darkBlue" }} to={`/${language}/resetPassword`}>
            {translate.resetPassword[language]}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
