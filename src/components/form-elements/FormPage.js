import { Navigate} from "react-router-dom";
import { useState } from 'react'; 
import { useLogin } from '../../hooks/useLogin'
import { signInWithPopup, FacebookAuthProvider} from "firebase/auth";
import { auth } from "../../firebase/config"
// import styles and images
import './formPage.css';
import google from '../../img/google.png';
import facebook from '../../img/fb.png';

function LoginPage (props) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, login } = useLogin();

    const handleSubmit = (e) => {
      e.preventDefault();
      login(email, password);
      
    }
    const signInWithFacebook = () => {
      
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
       .then((res) => {
          console.log(res);
       })
       .catch((err) => {
        console.log(err.message);
       })
    }

    return (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <div className="text-left">
                <p className='login'>{props.name}</p>
            </div>
            <div className="google-btn">
              <button >
                <div className='logo-container'>
                  <img src={google} alt="google_logo" className='logo'/>
                </div>
                  <div className='login-content'>
                    <span> {props.name} przy pomocy Google</span>
                  </div>
              </button>
            </div>
            <div className="facebook-btn">
                <button onClick={signInWithFacebook} >
                  <div className="logo-container">
                    <img src={facebook} alt="facebook_logo" className='logo' />
                  </div>
                    <div className="login-content">
                      <span> {props.name} przy pomocy facebooka</span>
                    </div>
                </button>
            </div>
            <div className="email-container">
              <input type="email"
               name="email"
               placeholder='email *'
               onChange={(e) => setEmail(e.target.value)}
               value={email}
               />
            </div>
            <input type="password" 
            name="password" 
            placeholder='hasło *'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <div className="email-container">
              <button  className='btn btn-dark button' >Zaloguj się</button>
              
            </div>
            <div className="text-left register-container">
             {props.footer}
            </div>
          </div>
         </form>
    );
}

export default LoginPage;