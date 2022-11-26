import React from 'react';
import ReactDOM from 'react-dom';
import {authentication} from '../firebase-config';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'; 
import './formPage.css';
import google from '../img/google.png';
import facebook from '../img/fb.png';

function FormPage () {
   
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
        .then((re) => {
            console.log(re);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        // <form action="/Your-Team" method='post'>
        <div className="form">
          <div className="form-group">
            <div className="text-left">
                <p className='login'>Zaloguj sie</p>
            </div>
            <div className="google-btn">
              <button onClick={signInWithGoogle}>
                <div className='logo-container'>
                  <img src={google} alt="google_logo" className='logo'/>
                </div>
                  <div className='login-content'>
                    <span> Zaloguj się przy pomocy Google</span>
                  </div>
              </button>
            </div>
            <div className="facebook-btn">
                <button>
                  <div className="logo-container">
                    <img src={facebook} alt="facebook_logo" className='logo' />
                  </div>
                    <div className="login-content">
                      <span> Zaloguj się przy pomocy facebooka</span>
                    </div>
                </button>
            </div>
            <input type="email" name="email" placeholder='email *' />
            <input type="password" name="password" placeholder='hasło *' />
            <button type='submit' className='btn btn-dark button'>Zaloguj się</button>
            <div className="text-left register-container">
                <span>Nie masz jeszcze konta? <a href='/register' className='bold-text' > Zarejestruj się</a></span>
            </div>
          </div>
         </div>
        // </form>
    );
}

export default FormPage;