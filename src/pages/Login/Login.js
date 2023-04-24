import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/Header';
import LoginPage from '../../components/form-elements/FormPage';
import Footer from '../../components/MainFooter';
import "../../App.css";
function Login() {
  // setTimeout(() => {
  // if (!sessionStorage.getItem('hasRun')) {
  //   sessionStorage.setItem('hasRun', 'true');
  //   window.location.reload();
  // }
  // },10)
  
    
    return (
      <div className="page-container login-container">
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