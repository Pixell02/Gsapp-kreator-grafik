import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/Header';
import LoginPage from '../../components/form-elements/FormPage';
import Footer from '../../components/MainFooter';
import "../../App.css";
function Login() {
    
    return (
      <div className="page-container">
        <div className="content-wrap">
        <div className="form-align-center">
          <LoginPage name = "Zaloguj się" footer = {
          <span>Nie masz jeszcze konta? 
            <Link to='/register' className='bold-text' > Zarejestruj się</Link>
          </span>}/>
        </div>
       </div>
      </div>
    );
}

export default Login;