import React from "react";
import Header from "../../components/Header";
import FormPage from "../../components/form-elements/FormPage";
import Footer from '../../components/MainFooter';
import "../../App.css";

function Register() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <div className="form-align-center">
          <FormPage
          name = "Zarejestruj się" footer = {
          <span>Masz już konto? 
            <a href="/login">Zaloguj się</a>
          </span>
        } />
        </div>
        </div>
        <Footer />
      </div>
    );
}

export default Register;