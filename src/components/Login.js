import React from 'react';
import Header from './Header';
import FormPage from './form-elements/FormPage';
import Footer from './MainFooter';
import "../App.css";
function Login() {
    return (
      <div className="page-container">
        <div className="content-wrap">
        <Header />
        <div className="form-align-center">
          <FormPage name = "Zaloguj się" footer = {
          <span>Nie masz jeszcze konta? 
            <a href='/register' className='bold-text' > Zarejestruj się</a>
          </span>}/>
        </div>
       </div>
       <Footer />
      </div>
    );
}

export default Login;