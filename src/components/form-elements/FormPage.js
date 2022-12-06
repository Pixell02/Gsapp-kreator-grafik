import { useNavigate } from "react-router-dom"
import { useState, useRouter } from "react"
import { useLogin } from "../../hooks/useLogin"
import { useAuthContext } from '../../hooks/useAuthContext'

import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth"
import { auth } from "../../firebase/config"
import { UserAuth } from "../../context/AuthContext";

// import styles and images
import "./formPage.css";
import google from "../../img/google.png";
import facebook from "../../img/fb.png";
import { FirebaseError } from "firebase/app";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, login } = useLogin();
  const [user, setUser] = useState({});
  const { dispatch } = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  const navigate = useNavigate();

  const signInWithFacebook = async() => {
    const provider = new FacebookAuthProvider();
      try {
        await signInWithPopup(auth, provider)
        .then((res) => {
          dispatch({type: 'LOGIN', payload: res.user});
          console.log(res.user);
          navigate('/YourTeams');
        })
      } catch (err) {
        console.log(err);
      }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth,provider)
      .then((res) => {
        dispatch({type: 'LOGIN', payload: res.user })
        navigate('/YourTeams');
      })
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <div className="text-left">
          <p className="login">{props.name}</p>
        </div>
        <div className="google-btn">
          <button onClick={ signInWithGoogle }>
            <div className="logo-container">
              <img src={google} alt="google_logo" className="logo" />
            </div>
            <div className="login-content">
              <span> {props.name} przy pomocy Google</span>
            </div>
          </button>
        </div>
        <div className="facebook-btn">
          <button onClick={ signInWithFacebook }>
            <div className="logo-container">
              <img src={facebook} alt="facebook_logo" className="logo" />
            </div>
            <div className="login-content">
              <span> {props.name} przy pomocy facebooka</span>
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
          placeholder="hasło *"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="email-container">
          <button className="btn btn-dark button">Zaloguj się</button>
        </div>
        
        <div className="text-left register-container">{props.footer}</div>
      </div>
    </form>
  );
}

export default LoginPage;
