import React from "react";
import { Link } from "react-router-dom"
import Header from "../../components/Header";
import RegisterForm from "../../components/form-elements/RegisterForm";
import Footer from '../../components/MainFooter';
import "../../App.css";

function Register() {
    return (
      <div className="page-container login-container">
        <div className="content-wrap">
          
          <div className="form-align-center">
          <RegisterForm
          name = "Zarejestruj się" footer = {
          <span>Masz już konto? 
            <Link to="/login">Zaloguj się</Link>
          </span>
        } />
        </div>
        </div>
      </div>
    );
}

export default Register;