import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import LoginPage from '../../components/form-elements/FormPage';
import "../../App.css";
import MainFooter from '../../components/main-content-elements/Footer';
import { LanguageContext } from '../../context/LanguageContext';
import translation from "./login.json";

function Login() {
    const {language} = useContext(LanguageContext)
    return (
      <div className="page-container login-container">
        <div className="content-wrap">
        <div className="form-align-center">
            <LoginPage name={translation.login[language]} footer = {
          <span>{translation.noAccount[language]}
            <Link to={`/${language}/register`} className='bold-text' > {translation.register[language]}</Link>
          </span>}/>
          </div>
          <MainFooter />
        </div>
      </div>
    );
}

export default Login;