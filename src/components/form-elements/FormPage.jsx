import React from 'react';
import ReactDOM from 'react-dom';
import {authentication} from '../../firebase-config';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'; 
import './formPage.css';
import google from '../../img/google.png';
import facebook from '../../img/fb.png';

function FormPage (props) {
   
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
        
        <div className="form">
          <div className="form-group">
            <div className="text-left">
                <p className='login'>{props.name}</p>
            </div>
            <div className="google-btn">
              <button onClick={signInWithGoogle}>
                <div className='logo-container'>
                  <img src={google} alt="google_logo" className='logo'/>
                </div>
                  <div className='login-content'>
                    <span> {props.name} przy pomocy Google</span>
                  </div>
              </button>
            </div>
            <div className="facebook-btn">
                <button>
                  <div className="logo-container">
                    <img src={facebook} alt="facebook_logo" className='logo' />
                  </div>
                    <div className="login-content">
                      <span> {props.name} przy pomocy facebooka</span>
                    </div>
                </button>
            </div>
            <div className="email-container">
              <input type="email" name="email"  placeholder='email *'  />
            </div>
            <input type="password" name="password" placeholder='hasło *' />
            <div className="email-container">
              <button type='submit' className='btn btn-dark button'>Zaloguj się</button>
            </div>
            <div className="text-left register-container">
             {props.footer}
            </div>
          </div>
         </div>
    );
}

export default FormPage;