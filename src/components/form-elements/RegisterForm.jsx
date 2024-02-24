import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./formPage.css";
import google from "../../img/google.png";
import translation from "./registerForm.json";
import LanguageOption from "../LanguageOption";
import { useLanguageContext } from "../../context/LanguageContext";
import useGoogleLogin from "../../hooks/useGoogleLogin";

export default function RegisterForm(props) {
  const { language } = useLanguageContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithGoogle } = useGoogleLogin();
  const { error, signup } = useSignup();

  const handleSubmit = () => {
    signup(email, password);
  };

  return (
    <div className="form">
      <div className="form-group">
        <div className="text-left">
          <div className="d-flex w-100">
            <div className="w-75">
              <p className="login">{props.name}</p>
            </div>
            <LanguageOption />
          </div>
        </div>
        <div className="google-btn">
          <button onClick={signInWithGoogle}>
            <div className="logo-container">
              <img src={google} alt="google_logo" className="logo" />
            </div>
            <div className="login-content">
              <span>
                {" "}
                {props.name} {translation.usingGoogle[language]}
              </span>
            </div>
          </button>
        </div>
        <div className="email-container">
          <input
            type="email"
            name="email"
            placeholder={translation.email[language]}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <input
          type="password"
          name="password"
          placeholder={translation.password[language]}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {error && <span>{translation.passwordValidation[language]}</span>}
        <div className="email-container">
          <button onClick={handleSubmit} className="btn btn-dark button">
            {props.name}
          </button>
        </div>
        <div className="text-left register-container">{props.footer}</div>
      </div>
    </div>
  );
}
