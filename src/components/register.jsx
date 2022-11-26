import React from "react";

function Register() {
    return (
        <div className="form">
        <div className="form-group">
          <div className="text-left">
              <p className='login'>Zaloguj sie</p>
          </div>
          <div className="google-btn">
              <button onClick={signInWithGoogle}>Zaloguj się przy pomocy Google</button>
          </div>
          <input type="email" name="email" placeholder='email *' />
          <input type="password" name="password" placeholder='hasło *' />
          <button type='submit' className='btn btn-dark button'>Zaloguj się</button>
          <div className="text-left register-container">
              <span>Nie masz jeszcze konta? <a href='/register' className='bold-text' > Zarejestruj się</a></span>
          </div>
        </div>
       </div>
    );
}